import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { IUploadService } from './interfaces/upload-service.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller(`v1/upload`)
export class UploadController {
  constructor(private readonly uploadService: IUploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.uploadService.uploadImage(file);
    return 'true'; // this data will be changed before file upload module done
    //return uploadedResult
  }
}
