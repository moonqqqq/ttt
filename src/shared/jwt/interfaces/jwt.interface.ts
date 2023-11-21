import { USER_TYPE_TYPES } from '../../../user/user.constants';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IPayload {
  type: USER_TYPE_TYPES;
  id: string;
}

export abstract class IJwtService {
  createJWT: (userData: IPayload) => Promise<ITokens>;
  verify: (token: string) => Promise<IPayload>;
}
