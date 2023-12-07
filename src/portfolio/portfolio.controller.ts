import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINT, API_VERSION } from '../shared/constants/api-versions';
import { GetPortfolioReqDTO } from './dtos/get-portfolio.dto';
import ResWrapper from '../shared/utils/res-wrapper.static';
import { ApiCreatedDataWrapResponse } from '../shared/decorators/api-created-res.decorator';
import {
  CreatePortfolioReqDTO,
  CreatePortfolioResDTO,
} from './dtos/create-portfolio.dto';
import {
  UpdatePortfolioReqDTO,
  UpdatePortfolioResDTO,
} from './dtos/update-portfolio.dto';
import { IdParamDTO } from '../shared/dtos/id-param.dto';

@ApiTags(`${API_ENDPOINT.PORTFOLIO}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.PORTFOLIO}`)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[API_ENDPOINT_4] Get portfolio list' })
  // @ApiOkListResponse(GetPortfolioResDTO)
  async getPortfolio(@Query() { size }: GetPortfolioReqDTO) {
    const result = await this.portfolioService.getPortfolios(size);
    return ResWrapper.list(result);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create portfolio' })
  @ApiCreatedDataWrapResponse(CreatePortfolioResDTO)
  async createPortfolio(@Body() body: CreatePortfolioReqDTO) {
    const createdPortfolio = await this.portfolioService.createPortfolio(body);
    return ResWrapper.single(createdPortfolio);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update portfolio' })
  @ApiCreatedDataWrapResponse(UpdatePortfolioResDTO)
  async updatePortfolio(
    @Param() { id }: IdParamDTO,
    @Body() body: UpdatePortfolioReqDTO,
  ) {
    const updatedPortfolio = await this.portfolioService.updatePortfolio(
      id,
      body,
    );
    return ResWrapper.single(updatedPortfolio);
  }
}
