import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MinioService } from './minio.service';

@Module({
  imports: [ConfigModule], // 👈 this is important
  providers: [MinioService],
  exports: [MinioService],
})
export class MinioModule {}
