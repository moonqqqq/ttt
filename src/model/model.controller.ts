import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ModelService } from './model.service';
import { API_ENDPOINT, API_VERSION } from '../shared/constants/api-versions';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import ResWrapper from '../shared/utils/res-wrapper.static';
import { IdParamDTO } from '../shared/dtos/id-param.dto';

@ApiTags(`${API_ENDPOINT.MODEL}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.MODEL}`)
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get('navigation')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[API_ENDPOINT_1] Get model list for Navigation' })
  // @ApiOkListResponse(GetModelResDTO)
  async getModels() {
    const models = await this.modelService.getModelsForNavigation();
    return ResWrapper.list(models);
  }

  @Get('default')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[API_ENDPOINT_5] Get model list for default list' })
  // @ApiOkListResponse(GetModelResDTO)
  async getModelsDefault() {
    const models = await this.modelService.getModelsForDefault();
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
  async getModelCustumSelections(@Param() { id }: IdParamDTO) {
    const model = await this.modelService.getModelCustomSelections(id);
    return ResWrapper.single(model);
  }
}
