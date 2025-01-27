import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // 👈 add this
import { Client } from 'minio';
import { Express } from 'express';

@Injectable()
export class MinioService {
  private minioClient: Client;

  constructor(private configService: ConfigService) {
    this.minioClient = new Client({
      endPoint: this.configService.get('MINIO_ENDPOINT', 'localhost'),
      port: parseInt(this.configService.get('MINIO_PORT', '9000')),
      useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get('MINIO_ACCESS_KEY', 'minioadmin'),
      secretKey: this.configService.get('MINIO_SECRET_KEY', 'minioadmin'),
    });
  }

  async createBucket(bucketName: string): Promise<void> {
    const exists = await this.minioClient.bucketExists(bucketName);
    if (!exists) {
      await this.minioClient.makeBucket(bucketName, 'us-east-1');
    }
  }

  async uploadFile(bucketName: string, file: Express.Multer.File): Promise<string> {
    await this.createBucket(bucketName);
    const filePath = `scholarships/${file.originalname}`;
    await this.minioClient.putObject(bucketName, filePath, file.buffer);

    const protocol = this.configService.get('MINIO_USE_SSL') === 'true' ? 'https' : 'http';
    const host = this.configService.get('MINIO_ENDPOINT', 'localhost');
    const port = this.configService.get('MINIO_PORT', '9000');

    return `${protocol}://${host}:${port}/${bucketName}/${filePath}`;
  }
}
