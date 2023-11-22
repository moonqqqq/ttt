import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { PrismaModule } from '../shared/prisma/prisma.module';
import { JWTModule } from '../shared/jwt/jwt.module';

@Module({
  imports: [PrismaModule, JWTModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
