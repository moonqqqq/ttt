import { ApiProperty } from '@nestjs/swagger';

export class BaseDataDTO {
  @ApiProperty({ type: 'date', example: '2023-11-20T09:13:05.467Z' })
  createdAt: Date;

  @ApiProperty({ type: 'date', example: '2023-11-20T09:13:05.467Z' })
  updatedAt: Date;
}
