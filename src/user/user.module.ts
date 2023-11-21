import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../shared/prisma/prisma.module';
import { JWTModule } from '../shared/jwt/jwt.module';

@Module({
  imports: [PrismaModule, JWTModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
