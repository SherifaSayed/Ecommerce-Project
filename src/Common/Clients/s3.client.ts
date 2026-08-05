import {S3Client , DeleteObjectCommand,DeleteObjectsCommand,GetObjectCommand, PutObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "node:fs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import multer from 'multer';
@Injectable()
export abstract class S3ClientService {
    private config;
    private s3Client:S3Client;
    private bucketName;
     constructor(private configService:ConfigService ){

        this.config= {
        region: this.configService.get('s3.regoin'),
        credentials: {
            accessKeyId: this.configService.get('s3.accessKeyId'),
            secretAccessKey: this.configService.get('s3.secretAccessKey'),
          },
        }
        this.s3Client= new S3Client(this.config)
       this.bucketName =this.configService.get('s3.bucketName');
     }
   


     putObjectClient(file: Express.Multer.File, key: string) {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: fs.createReadStream(file.path),
            ContentType: file.mimetype,
        });

        return this.s3Client.send(command);
    }

  async   getSignedUrlClient(key: string, expiresIn: number = 60) {
        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });

        const url = await getSignedUrl(this.s3Client, command, { expiresIn });

        return { key, url };
    }

     deleteObjectClient(key: string) {
        const command = new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });

        return this.s3Client.send(command);
    }

    // ['dk', 'ff', 'ff']
    // [{ key: 'ff' }, { key: 'dd' }, { key: '' }]
     deleteObjectsClient(keys: string[]) {
        const command = new DeleteObjectsCommand({
            Bucket: this.bucketName,
            Delete: {
                Objects: keys.map((key) => ({ Key: key })),
            },
        });

        return this.s3Client.send(command);
    }
}