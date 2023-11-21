import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { ITokens } from '../../shared/jwt/interfaces/jwt.interface';

export class SigninReqDTO {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'test@test.in',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'password123@',
  })
  @IsString()
  password: string;
}

export class TokenResDto {
  @ApiProperty({ example: 'Berear shdfioejmikf', description: 'Access Token' })
  accessToken: ITokens['accessToken'];

  @ApiProperty({ example: 'Berear shdfioejmikf', description: 'Refresh Token' })
  refreshToken: ITokens['refreshToken'];
}
