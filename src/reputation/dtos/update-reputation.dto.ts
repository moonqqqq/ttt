import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';
import { BaseDataDTO } from '../../shared/dtos/base-timestamp.dto';

export class UpdateReputationReqDTO {
  @ApiPropertyOptional({
    type: 'string',
    example: 'It is good company to work with',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({ type: 'string', example: 'https://image~' })
  @IsString()
  imageURL: string;

  @ApiPropertyOptional({
    example: 'it was good experience work with these guys ~~',
  })
  @IsString()
  content: string;

  @ApiPropertyOptional({
    type: Date,
    example: '2023-11-20T09:13:05.467Z',
  })
  @IsDateString()
  writenAt: string;
}

export class UpdateReputationResDTO extends BaseDataDTO {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'It is good company to work with',
  })
  @IsString()
  title: string;

  @ApiProperty({ type: 'string', required: true, example: 'https://image~' })
  @IsString()
  imageURL: string;

  @ApiProperty({
    required: true,
    example: 'it was good experience work with these guys ~~',
  })
  @IsString()
  content: string;

  @ApiProperty({
    type: Date,
    required: true,
    example: '2023-11-20T09:13:05.467Z',
  })
  @IsDateString()
  writenAt: string;
}
