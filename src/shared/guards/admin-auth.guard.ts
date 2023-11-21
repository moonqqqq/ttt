import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { USER_TYPE } from '../../user/user.constants';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.user) {
      return false;
    }
    if (req.user.type !== USER_TYPE.ADMIN)
      throw new UnauthorizedException({ message: 'Only admin can process' });
    return true;
  }
}
