import { ApiProperty } from '@nestjs/swagger';
import {
  MEDIA,
  MEDIA_QUERY,
  MEDIA_QUERY_TYPES,
  MEDIA_TYPES,
} from '../interfaces/media-enum.interface';
import { IsEnum, IsOptional } from 'class-validator';
import { BaseDataDTO } from '../../shared/dtos/base-timestamp.dto';

export class GetMediaReqDTO {
  @ApiProperty({ enum: MEDIA_QUERY, example: MEDIA.NEWS })
  @IsEnum(MEDIA_QUERY)
  @IsOptional()
  type?: MEDIA_QUERY_TYPES;
}

export class GetMediaResDTO extends BaseDataDTO {
  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ enum: MEDIA, example: MEDIA.NEWS })
  @IsEnum(MEDIA)
  type: MEDIA_TYPES;

  @ApiProperty({ example: 'https://image~' })
  imageURL: string;

  @ApiProperty({ example: 'https://image~' })
  link: string;

  @ApiProperty({ example: '한빛미디어' })
  publisher: string;

  @ApiProperty({ type: Date, example: '2023-11-20T09:13:05.467Z' })
  uploadedAt: Date;
}
