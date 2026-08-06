import { BadRequestException, Injectable } from "@nestjs/common";
import { S3ClientService } from "../Clients";

@Injectable()
export default class FileService {
   constructor(private s3ClientService:S3ClientService){}
  async uploadFile(file: Express.Multer.File, key: string) {
    if (!file || !key)
      throw new BadRequestException("File and key are required");

    if (!file.mimetype || !file.path)
      throw new BadRequestException("File mimetype and path are required");

    const filekey = `${key}/${file.filename}`;

    await this.s3ClientService.putObjectClient(file, filekey);
    return this.getSignedUrl(filekey, 60);
  }

   uploadFiles(files: Express.Multer.File[], key: string) {
    if (!files || !files.length || !key)
      throw new BadRequestException("Files and key are required");

    return Promise.all(
      files.map(file => this.uploadFile(file, key))
    );
  }

  getSignedUrl(key: string, expiresIn: number = 60) {
    return this.s3ClientService.getSignedUrlClient(key, expiresIn);
  }

   deleteFile(key: string) {
    if (!key)
      throw new BadRequestException("Key is required");

    return this.s3ClientService.deleteObjectClient(key);
  }

   deleteFiles(keys: string[]) {
    return this.s3ClientService.deleteObjectsClient(keys);
  }
}

