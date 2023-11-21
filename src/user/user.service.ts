import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { IJwtService } from '../shared/jwt/interfaces/jwt.interface';
import { USER_TYPE } from './user.constants';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: IJwtService,
  ) {}

  /**
   * This is for making admin user by developer
   */
  // async createAdmin(body: {email: string, password: string}) {
  //     const exsitingUser = await this.prisma.admin.findFirst({
  //         where: {
  //             email: body.email
  //         }
  //     });

  //     if (exsitingUser) throw new ConflictException("Already existing email")

  //     const salt = await bcrypt.genSalt(10);
  //     const hashedPassword = await bcrypt.hash(body.password, salt);

  //     await this.prisma.admin.create({
  //         data: {
  //             email: body.email,
  //             password: hashedPassword,
  //             salt
  //         }
  //     })
  // }

  async #comparePassword(
    enteredPassword: string,
    storedPassword: string,
    salt: string,
  ): Promise<boolean> {
    const hashedEnteredPassword = await bcrypt.hash(enteredPassword, salt);
    return hashedEnteredPassword === storedPassword;
  }

  async signinAdmin(body: { email: string; password: string }) {
    const exsitingUser = await this.prisma.admin.findFirst({
      where: {
        email: body.email,
      },
    });
    if (!exsitingUser) throw new NotFoundException('User not exists');

    const exists = await this.#comparePassword(
      body.password,
      exsitingUser.password,
      exsitingUser.salt,
    );
    if (!exists) throw new BadRequestException('Wrong password');

    return await this.jwtService.createJWT({
      type: USER_TYPE.ADMIN,
      id: exsitingUser.id,
    });
  }
}
