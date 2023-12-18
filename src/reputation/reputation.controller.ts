import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReputationService } from './reputation.service';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiCreatedDataWrapResponse } from '../shared/decorators/api-created-res.decorator';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { AdminAuthGuard } from '../shared/guards/admin-auth.guard';
import ResWrapper from '../shared/utils/res-wrapper.static';
import { ApiOkListResponse } from '../shared/decorators/api-ok-list-res.decorator';
import { IdParamDTO } from '../shared/dtos/id-param.dto';
import {
  CreateReputationReqDTO,
  CreateReputationResDTO,
} from './\bdtos/create-reputation.dto';
import { GetReputationResDTO } from './\bdtos/get-reputation.dto';
import {
  UpdateReputationReqDTO,
  UpdateReputationResDTO,
} from './\bdtos/update-reputation.dto';
import { API_ENDPOINT, API_VERSION } from '../shared/constants/api-versions';
import { LANGUAGE_TYPE } from '../shared/constants/language';

@ApiTags(`${API_ENDPOINT.REPUTATION}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.REPUTATION}`)
export class ReputationController {
  constructor(private readonly reputationService: ReputationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create reputation' })
  @ApiCreatedDataWrapResponse(CreateReputationResDTO)
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  async createReputation(@Body() dto: CreateReputationReqDTO) {
    const result = await this.reputationService.createReputation(dto);
    return ResWrapper.single(result);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[API_ENDPOINT_2] Get reputation list' })
  @ApiOkListResponse(GetReputationResDTO)
  async getReputation(@Headers('language') language: LANGUAGE_TYPE) {
    const reputations = await this.reputationService.getReputation(language);

    return ResWrapper.list(reputations);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update reputation' })
  @ApiOkResponse({ type: UpdateReputationResDTO })
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  async updateReputation(
    @Param() { id }: IdParamDTO,
    @Body() body: UpdateReputationReqDTO,
  ) {
    const reputation = await this.reputationService.updateReputation(id, body);
    return ResWrapper.single(reputation);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete reputation' })
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @ApiNoContentResponse({
    description: 'Deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Wrong id',
  })
  async deleteReputation(@Param() { id }: IdParamDTO) {
    const reputation = await this.reputationService.deleteReputation(id);
    return ResWrapper.single(reputation);
  }
}
