import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IdParamDTO {
  @ApiProperty()
  @IsString()
  id: string;
}
