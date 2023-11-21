import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ModelService } from './model.service';
import { API_ENDPOINT, API_VERSION } from '../shared/constants/api-versions';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkListResponse } from '../shared/decorators/api-ok-list-res.decorator';
import { GetModelResDTO } from './dtos/get-model.dto';
import ResWrapper from '../shared/utils/res-wrapper.static';

@ApiTags(`${API_ENDPOINT.MODEL}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.MODEL}`)
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get model list' })
  @ApiOkListResponse(GetModelResDTO)
  async getModels() {
    const models = await this.modelService.getModels();
    return ResWrapper.list(models);
  }
}
