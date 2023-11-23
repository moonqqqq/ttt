import { Module } from '@nestjs/common';
import { ReputationService } from './reputation.service';
import { ReputationController } from './reputation.controller';
import { PrismaModule } from '../shared/prisma/prisma.module';
import { JWTModule } from '../shared/jwt/jwt.module';

@Module({
  imports: [PrismaModule, JWTModule],
  controllers: [ReputationController],
  providers: [ReputationService],
})
export class ReputationModule {}
