import { FILE_ENUM_TYPE } from '../file.constants';

export abstract class IUploadService {
  uploadImage: (file: Express.Multer.File) => Promise<{ savedURL: string }>;
  _getFormattedFileName: (fileName: string) => string;
  _getSavedURL: (fileType: FILE_ENUM_TYPE, formattedFilename: string) => string;
  _getFileKey: (fileType: FILE_ENUM_TYPE, formattedFilename: string) => string;
}
