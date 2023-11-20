import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { MediaService } from './media.service';
import { API_ENDPOINT, API_VERSION } from '../shared/constants/api-versions';
import { GetMediaReqDTO, GetMediaResDTO } from './dtos/get-media.dto';
import ResWrapper from '../shared/utils/res-wrapper.static';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(`${API_ENDPOINT.MEDIA}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.MEDIA}`)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // @Post()
  // async createMedia() {
  //   await this.mediaService.createMedia();
  // }

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
