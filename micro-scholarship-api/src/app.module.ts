import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ScholarshipModule } from './scholarship/scholarship.module';
import { ConfigModule } from '@nestjs/config';
import { MinioModule } from './minio/minio.module';
import { DonersModule } from './doners/doners.module';
import { UsersModule } from './users/users.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule,PrismaModule, ScholarshipModule,    ConfigModule.forRoot(),MinioModule, DonersModule, UsersModule, UserModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
