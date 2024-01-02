import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { PrismaModule } from '../shared/prisma/prisma.module';
import { EmailService } from './email.service';

@Module({
  imports: [PrismaModule],
  controllers: [ModelController],
  providers: [ModelService, EmailService],
})
export class ModelModule {}
