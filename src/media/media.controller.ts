import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { API_ENDPOINT, API_VERSION } from '../shared/constants/api-versions';
import { GetMediaReqDTO, GetMediaResDTO } from './dtos/get-media.dto';
import ResWrapper from '../shared/utils/res-wrapper.static';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMediaReqDTO, CreateMediaResDTO } from './dtos/create-media.dto';
import { ApiOkListResponse } from '../shared/decorators/api-ok-list-res.decorator';
import { ApiCreatedDataWrapResponse } from '../shared/decorators/api-created-res.decorator';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { AdminAuthGuard } from '../shared/guards/admin-auth.guard';
import { UpdateMediaReqDTO, UpdateMediaResDTO } from './dtos/patch-media.dto';
import { IdParamDTO } from '../shared/dtos/id-param.dto';

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
  @ApiOperation({ summary: '[API_ENDPOINT_3] Get media list' })
  @ApiOkListResponse(GetMediaResDTO)
  async getMedia(@Query() { type }: GetMediaReqDTO) {
    const medias = await this.mediaService.getMedia(type);

    return ResWrapper.list(medias);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update media' })
  @ApiOkResponse({ type: UpdateMediaResDTO })
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  async updateMedia(
    @Param() { id }: IdParamDTO,
    @Body() body: UpdateMediaReqDTO,
  ) {
    const media = await this.mediaService.updateMedia(id, body);
    return ResWrapper.single(media);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete media' })
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @ApiNoContentResponse({
    description: 'Deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Wrong id',
  })
  async deleteMedia(@Param() { id }: IdParamDTO) {
    const media = await this.mediaService.deleteMedia(id);
    return ResWrapper.single(media);
  }
}
