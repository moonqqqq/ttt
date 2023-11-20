import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINT, API_VERSION } from '../shared/constants/api-versions';
import { ApiOkListResponse } from '../shared/decorators/api-ok-list-res.decorator';
import {
  GetPortfolioReqDTO,
  GetPortfolioResDTO,
} from './dtos/get-portfolio.dto';
import ResWrapper from '../shared/utils/res-wrapper.static';

@ApiTags(`${API_ENDPOINT.PORTFOLIO}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.PORTFOLIO}`)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get portfolio list' })
  @ApiOkListResponse(GetPortfolioResDTO)
  async getPortfolio(@Query() { size }: GetPortfolioReqDTO) {
    const result = await this.portfolioService.getPortfolios(size);
    return ResWrapper.single(result);
  }
}
