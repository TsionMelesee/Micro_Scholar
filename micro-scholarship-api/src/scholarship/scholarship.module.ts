import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';  // <-- import ConfigModule here
import { JwtModule } from '@nestjs/jwt';
import { ScholarshipController } from './scholarship.controller';
import { ScholarshipService } from './scholarship.service';
import { MinioService } from '../minio/minio.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [ConfigModule, JwtModule],  // <-- add ConfigModule and JwtModule to the imports
  controllers: [ScholarshipController],
  providers: [ScholarshipService, MinioService, PrismaService],
})
export class ScholarshipModule {}
