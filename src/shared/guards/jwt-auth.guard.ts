import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IJwtService } from '../jwt/interfaces/jwt.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: IJwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.headers.authorization) {
      return false;
    }
    req.user = await this.jwtService.verify(req.headers.authorization);
    return true;
  }
}
