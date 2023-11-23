import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { BaseDataDTO } from '../../shared/dtos/base-timestamp.dto';

export class UpdatePortfolioReqDTO {
  @ApiProperty({ type: 'string', example: '포천리' })
  @IsString()
  location: string;

  @ApiProperty({ type: 'string', example: 'Mini' })
  @IsString()
  model: string;

  @ApiProperty({ type: 'number', example: '10' })
  @IsNumber()
  size: number;

  @ApiProperty({ type: [String], example: ['https://s3~'] })
  @IsString({ each: true })
  @IsArray()
  images: string[];
}

export class UpdatePortfolioResDTO extends BaseDataDTO {
  @ApiProperty({ type: 'string', example: '포천리' })
  location: string;

  @ApiProperty({ type: 'string', example: 'Mini' })
  model: string;

  @ApiProperty({ type: 'number', example: 3 })
  size: number;

  @ApiProperty({ type: [String], example: ['https://s3~'] })
  @IsString({ each: true })
  @IsArray()
  images: string[];
}
