import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { EmailService } from './email.service';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, EmailService],
})
export class ReservationModule {}
