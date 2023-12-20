import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiCreatedDataWrapResponse } from '../shared/decorators/api-created-res.decorator';
import {
  CreateReservationReqDTO,
  CreateReservationResDTO,
} from './dtos/create-reservation.dto';
import ResWrapper from '../shared/utils/res-wrapper.static';
import { API_ENDPOINT, API_VERSION } from '../shared/constants/api-versions';
import { IdParamDTO } from '../shared/dtos/id-param.dto';

@ApiTags(`${API_ENDPOINT.RESERVATION}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.RESERVATION}`)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '[API_ENDPOINT_8] Create reservation' })
  @ApiCreatedDataWrapResponse(CreateReservationResDTO)
  async createReservation(@Body() body: CreateReservationReqDTO) {
    const createdReservation =
      await this.reservationService.createReservation(body);
    return ResWrapper.single(createdReservation);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[API_ENDPOINT_10] Get reservation' })
  // @ApiCreatedDataWrapResponse(CreateReservationResDTO)
  async getReservationReceipt(@Param() { id }: IdParamDTO) {
    const createdReservation =
      await this.reservationService.getReservationReceipt(id);
    return ResWrapper.single(createdReservation);
  }
}
