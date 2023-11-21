import * as jwt from 'jsonwebtoken';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILoggerService } from '../logger/interface/logger-service.interface';
import { IJwtService, IPayload, ITokens } from './interfaces/jwt.interface';

@Injectable()
export class JwtService implements IJwtService {
  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: ILoggerService,
  ) {}

  async #signToken(
    payload: Partial<IPayload>,
    secretKey: string,
    expiresIn: string | number,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const options = {
        expiresIn: expiresIn,
      };

      jwt.sign(payload, secretKey, options, (err, token) => {
        if (err) {
          this.loggerService.error(err);
          reject(err);
        } else {
          resolve(token as string);
        }
      });
    });
  }

  async createJWT(userData: IPayload): Promise<ITokens> {
    const payload = userData;

    const [accessToken, refreshToken] = await Promise.all([
      this.#signToken(
        payload,
        this.configService.get('app.jwtSecret'),
        this.configService.get('app.jwtAccessExpire'),
      ),
      this.#signToken(
        payload,
        this.configService.get('app.jwtSecret'),
        this.configService.get('app.jwtRefreshExpire'),
      ),
    ]);

    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    };
  }

  async verify(token: string): Promise<IPayload> {
    return new Promise((resolve, reject) => {
      if (token.split(' ')[0] !== 'Bearer') {
        throw new BadRequestException({ message: 'Not proper token' });
      }

      jwt.verify(
        token.split(' ')[1],
        this.configService.get('app.jwtSecret'),
        (err, decoded) => {
          if (err) {
            if (err.message === 'jwt expired') {
              reject(new UnauthorizedException(401, 'Token expired'));
            } else if (err.message === 'invalid signature') {
              reject(
                new UnauthorizedException({ message: 'Invalid signature' }),
              );
            } else {
              this.loggerService.error(err);
              reject(err);
            }
          } else {
            resolve(decoded as IPayload);
          }
        },
      );
    });
  }
}
