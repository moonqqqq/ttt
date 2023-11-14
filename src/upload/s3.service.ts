import { Injectable } from '@nestjs/common';
import { IUploadService } from './interfaces/upload-service.interface';
import { ILoggerService } from 'src/shared/logger/interface/logger-service.interface';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { FILE_ENUM, FILE_ENUM_TYPE } from './file.constants';

@Injectable()
export class S3Service implements IUploadService {
  private s3: AWS.S3;

  constructor(
    private readonly logger: ILoggerService,
    private configService: ConfigService,
  ) {
    this.s3 = new AWS.S3({
      signatureVersion: 'v4',
      accessKeyId: this.configService.get('s3.accessKeyId'),
      secretAccessKey: this.configService.get('s3.secretAccessKey'),
      region: this.configService.get('s3.region'),
    });
  }

  async uploadImage(file: Express.Multer.File) {
    const formattedFilename = this._getFormattedFileName(file.originalname);

    try {
      await this.s3
        .upload({
          Key: this._getFileKey(FILE_ENUM.IMAGE, formattedFilename),
          Body: file.buffer,
          ContentType: 'image/png',
          Bucket: this.configService.get('s3.bucket'),
        })
        .promise();
    } catch (err) {
      this.logger.error(err);
    }

    return {
      savedURL: this._getSavedURL(FILE_ENUM.IMAGE, formattedFilename),
    };
  }

  /**
   * This is for cleaning up the filename. and make it not duplicatable by adding date
   */
  _getFormattedFileName(filename: string) {
    const extension = filename.split('.').pop();

    const now = Date.now();
    return `${filename.trim().replace(/\s+/g, '_')}${now}.${extension}`;
  }

  /**
   * This is for setting the directory.
   * You can make it structured granularly by adding more directory like adding userId directory.
   */
  _getFileKey(fileType: FILE_ENUM_TYPE, formattedFilename: string) {
    return `${fileType}/${formattedFilename}`;
  }

  /**
   * Get the full url file saved.
   */
  _getSavedURL(fileType: FILE_ENUM_TYPE, formattedFilename: string) {
    return `${this.configService.get(
      's3.publicFileStorageDomain',
    )}/${this._getFileKey(fileType, formattedFilename)}`;
  }
}
