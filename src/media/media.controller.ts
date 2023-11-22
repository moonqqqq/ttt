import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { API_ENDPOINT, API_VERSION } from '../shared/constants/api-versions';
import { GetMediaReqDTO, GetMediaResDTO } from './dtos/get-media.dto';
import ResWrapper from '../shared/utils/res-wrapper.static';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMediaReqDTO, CreateMediaResDTO } from './dtos/create-media.dto';
import { ApiOkListResponse } from '../shared/decorators/api-ok-list-res.decorator';
import { ApiCreatedDataWrapResponse } from '../shared/decorators/api-created-res.decorator';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { AdminAuthGuard } from '../shared/guards/admin-auth.guard';

@ApiTags(`${API_ENDPOINT.MEDIA}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.MEDIA}`)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create media' })
  @ApiCreatedDataWrapResponse(CreateMediaResDTO)
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  async createMedia(@Body() dto: CreateMediaReqDTO) {
    const result = await this.mediaService.createMedia(dto);
    return ResWrapper.single(result);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get media list' })
  @ApiOkListResponse(GetMediaResDTO)
  async getMedia(@Query() { type }: GetMediaReqDTO) {
    const medias = await this.mediaService.getMedia(type);

    return ResWrapper.list(medias);
  }
}
