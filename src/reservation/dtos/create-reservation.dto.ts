import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDataDTO } from '../../shared/dtos/base-timestamp.dto';

export class CreateReservationReqDTO {
  @ApiProperty({ type: 'any', description: 'the selected value from options' })
  @IsNotEmpty()
  data: any;

  @ApiProperty({ type: 'string', example: 'name1' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', example: 'heal@hyperhire.in' })
  @IsString()
  email: number;

  @ApiProperty({ type: 'string', example: '01088168016' })
  @IsString()
  phoneNumber: number;

  @ApiProperty({ type: 'string', example: 'seoul' })
  @IsString()
  address: number;
}

export class CreateReservationResDTO extends BaseDataDTO {
  @ApiProperty({ type: 'json' })
  data: any;

  @ApiProperty({ type: 'string', example: 'name1' })
  name: string;

  @ApiProperty({ type: 'string', example: 'heal@hyperhire.in' })
  email: string;

  @ApiProperty({ type: 'string', example: '0108816816' })
  phoneNumber: string;

  @ApiProperty({ type: 'string', example: 'seoul' })
  address: string;
}
