import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { BaseDataDTO } from '../../shared/dtos/base-timestamp.dto';
import {
  PORTFOLIO_SIZE_QUERY,
  PORTFOLIO_SIZE_QUERY_TYPE,
} from '../portfolio.constants';

export class GetPortfolioReqDTO {
  @ApiPropertyOptional({
    enum: PORTFOLIO_SIZE_QUERY,
    required: false,
    example: PORTFOLIO_SIZE_QUERY.ELEVEN_TO_TWENTY,
  })
  @IsEnum(PORTFOLIO_SIZE_QUERY)
  @IsOptional()
  size?: PORTFOLIO_SIZE_QUERY_TYPE;
}

export class GetPortfolioResDTO extends BaseDataDTO {
  @ApiProperty({ type: 'string', example: '포천리' })
  location: string;

  @ApiProperty({ type: 'string', example: 'Mini' })
  model: string;

  @ApiProperty({ type: 'number', example: 3 })
  size: number;

  @ApiProperty({ type: 'array', example: ['https://image~'] })
  images: string[];
}
