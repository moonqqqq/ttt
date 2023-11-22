import { ApiProperty } from '@nestjs/swagger';
import { MEDIA, MEDIA_TYPES } from '../interfaces/media-enum.interface';
import { IsDateString, IsEnum, IsString } from 'class-validator';
import { BaseDataDTO } from '../../shared/dtos/base-timestamp.dto';

export class CreateMediaReqDTO {
  @ApiProperty({
    type: 'string',
    required: true,
    example: '스웨 35억 투자 유치 !',
  })
  @IsString()
  title: string;

  @ApiProperty({ enum: MEDIA, example: MEDIA.NEWS, required: true })
  @IsEnum(MEDIA)
  type: MEDIA_TYPES;

  @ApiProperty({ type: 'string', required: true, example: 'https://image~' })
  @IsString()
  imageURL: string;

  @ApiProperty({ required: true, example: 'https://image~' })
  @IsString()
  link: string;

  @ApiProperty({ required: true, example: '한빛미디어' })
  @IsString()
  publisher: string;

  @ApiProperty({
    type: Date,
    required: true,
    example: '2023-11-20T09:13:05.467Z',
  })
  @IsDateString()
  uploadedAt: Date;
}

export class CreateMediaResDTO extends BaseDataDTO {
  @ApiProperty({ type: 'string', example: '스웨 35억 투자 유치 !' })
  @IsString()
  title: string;

  @ApiProperty({ enum: MEDIA, example: MEDIA.NEWS, required: true })
  @IsEnum(MEDIA)
  type: MEDIA_TYPES;

  @ApiProperty({ type: 'string', required: true, example: 'https://image~' })
  @IsString()
  imageURL: string;

  @ApiProperty({ required: true, example: 'https://image~' })
  @IsString()
  link: string;

  @ApiProperty({ required: true, example: '한빛미디어' })
  @IsString()
  publisher: string;

  @ApiProperty({
    type: Date,
    required: true,
    example: '2023-11-20T09:13:05.467Z',
  })
  @IsDateString()
  uploadedAt: Date;
}
