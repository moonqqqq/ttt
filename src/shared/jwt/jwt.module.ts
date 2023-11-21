import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';

import { JwtService } from './jwt.service';
import { IJwtService } from './interfaces/jwt.interface';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: IJwtService,
      useClass: JwtService,
    },
  ],
  exports: [IJwtService],
})
export class JWTModule {}
