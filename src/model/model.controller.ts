import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ModelService } from './model.service';
import { API_ENDPOINT, API_VERSION } from '../shared/constants/api-versions';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import ResWrapper from '../shared/utils/res-wrapper.static';

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
}
