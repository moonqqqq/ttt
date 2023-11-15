import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadFileResDTO {
  @ApiProperty({
    example:
      'https://backend-boil.s3.ap-northeast-2.amazonaws.com//image/스크린샷_2023-10-16_오후_5.18.41(3).png1700042591892.png',
  })
  @IsString()
  savedURL: string;
}
