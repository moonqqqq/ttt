import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { API_ENDPOINT, API_VERSION } from '../shared/constants/api-versions';
import { GetMediaReqDTO, GetMediaResDTO } from './dtos/get-media.dto';
import ResWrapper from '../shared/utils/res-wrapper.static';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMediaReqDTO, CreateMediaResDTO } from './dtos/create-media.dto';

@ApiTags(`${API_ENDPOINT.MEDIA}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.MEDIA}`)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create media' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created one',
    type: CreateMediaResDTO,
  })
  // SET ADMIN VALIDATION PROCESS
  async createMedia(@Body() dto: CreateMediaReqDTO) {
    const result = await this.mediaService.createMedia(dto);
    return ResWrapper.single(result);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get media list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: GetMediaResDTO,
  })
  async getMedia(@Query() { type }: GetMediaReqDTO) {
    const medias = await this.mediaService.getMedia(type);

    return ResWrapper.list(medias);
  }
}
