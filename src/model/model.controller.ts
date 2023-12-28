import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { API_ENDPOINT, API_VERSION } from '../shared/constants/api-versions';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import ResWrapper from '../shared/utils/res-wrapper.static';
import { IdParamDTO } from '../shared/dtos/id-param.dto';
import { LANGUAGE_TYPE } from '../shared/constants/language';

@ApiTags(`${API_ENDPOINT.MODEL}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.MODEL}`)
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get('navigation')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[API_ENDPOINT_1] Get model list for Navigation' })
  // @ApiOkListResponse(GetModelResDTO)
  async getModels(@Headers('language') language: LANGUAGE_TYPE) {
    const models = await this.modelService.getModelsForNavigation(language);
    return ResWrapper.list(models);
  }

  @Get('default')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[API_ENDPOINT_5] Get model list for default list' })
  // @ApiOkListResponse(GetModelResDTO)
  async getModelsDefault(@Headers('language') language: LANGUAGE_TYPE) {
    const models = await this.modelService.getModelsForDefault(language);
    return ResWrapper.list(models);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[API_ENDPOINT_6] Get model detail' })
  // @ApiOkListResponse(GetModelResDTO)
  async getModelDetail(@Param() { id }: IdParamDTO) {
    const model = await this.modelService.getModelDetail(id);
    return ResWrapper.single(model);
  }

  @Get(':id/custom-selections')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[API_ENDPOINT_] Get model detail' })
  // @ApiOkListResponse(GetModelResDTO)
  async getModelCustumSelections(
    @Headers('language') language: LANGUAGE_TYPE,
    @Param() { id }: IdParamDTO,
  ) {
    const model = await this.modelService.getModelCustomSelections(
      id,
      language,
    );
    return ResWrapper.single(model);
  }

  @Get(':id/others')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[API_ENDPOINT_7] Get other model list' })
  // @ApiOkListResponse(GetModelResDTO)
  async getOtherModels(@Param() { id }: IdParamDTO) {
    const models = await this.modelService.getOtherModels(id);
    return ResWrapper.list(models);
  }
}
