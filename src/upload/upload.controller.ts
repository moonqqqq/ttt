import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { IUploadService } from './interfaces/upload-service.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadFileResDTO } from './dtos/upload-file-res.dto';
import { API_VERSION } from '../shared/constants/api-versions';
import { FileUploadDto } from './dtos/upload-file-req.dto';
import { ApiCreatedDataWrapResponse } from '../shared/decorators/api-created-res.decorator';

@ApiTags('upload')
@Controller(`${API_VERSION.ONE}/upload`)
export class UploadController {
  constructor(private readonly uploadService: IUploadService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'A image file',
    type: FileUploadDto,
  })
  @ApiCreatedDataWrapResponse(UploadFileResDTO)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.uploadService.uploadImage(file);

    return result;
  }
}
