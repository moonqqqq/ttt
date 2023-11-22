import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { BaseDataDTO } from '../../shared/dtos/base-timestamp.dto';
import { Type } from 'class-transformer';

class CreatePortfolioImageDTO {
  @ApiProperty({ type: 'string', example: 'https://image~' })
  @IsString()
  url: string;
}

export class CreatePortfolioReqDTO {
  @ApiProperty({ type: 'string', example: '포천리' })
  @IsString()
  location: string;

  @ApiProperty({ type: 'string', example: 'Mini' })
  @IsString()
  model: string;

  @ApiProperty({ type: 'number', example: '10' })
  @IsNumber()
  size: number;

  @IsArray()
  @ApiProperty({ type: [CreatePortfolioImageDTO] })
  @ValidateNested({
    each: true,
    message: `each input should be shape of { url: string }`,
  })
  @Type(() => CreatePortfolioImageDTO)
  images: CreatePortfolioImageDTO[];
}

export class CreatePortfolioResDTO extends BaseDataDTO {
  @ApiProperty({ type: 'string', example: '포천리' })
  location: string;

  @ApiProperty({ type: 'string', example: 'Mini' })
  model: string;

  @ApiProperty({ type: 'number', example: 3 })
  size: number;

  @ApiProperty({ type: [CreatePortfolioImageDTO] })
  images: CreatePortfolioImageDTO[];
}
