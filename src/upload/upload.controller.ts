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
import { API_ENDPOINT, API_VERSION } from '../shared/constants/api-versions';
import { FileUploadDTO } from './dtos/upload-file-req.dto';
import { ApiCreatedDataWrapResponse } from '../shared/decorators/api-created-res.decorator';
import { BODY_INPUT_TYPE } from '../shared/constants/swagger';

@ApiTags(`${API_ENDPOINT.UPLOAD}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.UPLOAD}`)
export class UploadController {
  constructor(private readonly uploadService: IUploadService) {}

  @Post()
  @ApiConsumes(BODY_INPUT_TYPE.MULTIPART_FORMDATA)
  @ApiBody({
    description: 'A image file',
    type: FileUploadDTO,
  })
  @ApiCreatedDataWrapResponse(UploadFileResDTO)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.uploadService.uploadImage(file);

    return result;
  }
}
