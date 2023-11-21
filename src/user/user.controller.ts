import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINT, API_VERSION } from '../shared/constants/api-versions';
import { ApiCreatedDataWrapResponse } from '../shared/decorators/api-created-res.decorator';
import { SigninReqDTO, TokenResDto } from './dtos/signin.dto';
import ResWrapper from '../shared/utils/res-wrapper.static';

@ApiTags(`${API_ENDPOINT.USER}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.USER}`)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signin/admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Signin successfully' })
  @ApiCreatedDataWrapResponse(TokenResDto)
  async signinAdmin(@Body() body: SigninReqDTO) {
    const tokens = await this.userService.signinAdmin(body);

    return ResWrapper.single(tokens);
  }
}
