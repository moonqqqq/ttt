export abstract class IUploadService {
  uploadImage: (file: Express.Multer.File) => Promise<{ savedURL: string }>;
}
