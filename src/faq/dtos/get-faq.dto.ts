import { ApiProperty } from '@nestjs/swagger';
import { BaseDataDTO } from '../../shared/dtos/base-timestamp.dto';

export class GetFaqResDTO extends BaseDataDTO {
  @ApiProperty({ type: 'string', example: 'conan은 어떤 사람인가요?' })
  question: string;

  @ApiProperty({ type: 'string', example: '코난은 멋있는 사람이죠.' })
  answer: string;
}
