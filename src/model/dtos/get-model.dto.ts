import { ApiProperty } from '@nestjs/swagger';
import { BaseDataDTO } from '../../shared/dtos/base-timestamp.dto';
import { MODEL_PURPOSE, MODEL_PURPOSE_TYPE } from '../model.constants';

// export class GetMediaReqDTO {
//   @ApiProperty({ enum: MEDIA, example: MEDIA.NEWS })
//   @IsEnum(MEDIA)
//   @IsOptional()
//   representativeImageURL?: MEDIA_TYPES;
// }

export class GetModelResDTO extends BaseDataDTO {
  @ApiProperty({ type: 'string', example: 'https://s3~' })
  representativeImageURL: string;

  @ApiProperty({ type: 'string', example: 'Mini' })
  name: string;

  @ApiProperty({
    enum: MODEL_PURPOSE,
    example: `${MODEL_PURPOSE.ACCOMMODATION}`,
  })
  purpose: MODEL_PURPOSE_TYPE;

  @ApiProperty({ type: 'number', example: 340000000 })
  minPrice: number;
}
