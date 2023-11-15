import { ApiProperty } from '@nestjs/swagger';
import { PaginationResDTO } from './pagination-res.dto';
import { IPagination } from '../interfaces/pagination.interface';

export class PaginationAndDataResDTO<T> {
  @ApiProperty({
    type: PaginationResDTO,
  })
  pagination: IPagination;

  @ApiProperty()
  data: T;
}
