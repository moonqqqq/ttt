import { ApiProperty } from '@nestjs/swagger';

export class ListResDTO<T> {
  @ApiProperty()
  data: T;
}
