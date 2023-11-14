import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { UploadController } from './upload.controller';
import { LoggerModule } from 'src/shared/logger/logger.module';
import { IUploadService } from './interfaces/upload-service.interface';

@Module({
  controllers: [UploadController],
  providers: [
    {
      provide: IUploadService,
      useClass: S3Service,
    },
  ],
  imports: [LoggerModule],
})
export class UploadModule {}
