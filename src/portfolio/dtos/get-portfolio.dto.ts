import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { BaseDataDTO } from '../../shared/dtos/base-timestamp.dto';
import { Transform } from 'class-transformer';

export class GetPortfolioReqDTO {
  @ApiPropertyOptional({ example: '10', required: false })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  size?: number;
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
