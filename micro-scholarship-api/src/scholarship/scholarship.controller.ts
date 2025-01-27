import { Controller, Get, Post, Delete, Param, Body, UseGuards, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { ScholarshipService } from './scholarship.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { MinioService } from '../minio/minio.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Scholarship')
@Controller('scholarships')
export class ScholarshipController {
  constructor(
    private readonly scholarshipService: ScholarshipService,
    private readonly minioService: MinioService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('document'))
  async createRequest(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @User('id') studentId: string,
    @Req() req: Request
  ) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new Error('Token not provided');
    }
    const documentUrl = await this.minioService.uploadFile('scholarship-documents', file);

    return this.scholarshipService.createRequest(
      {
        ...body,
        amount: parseFloat(body.amount),
        status: 'PENDING',
        documentUrl,
      },
      token,
    );
  }

  @Get()
  getRequests(@User('id') studentId: string) {
    return this.scholarshipService.getRequests(studentId);
  }

  @Get(':id')
  getRequestById(@Param('id') id: string) {
    return this.scholarshipService.getRequestById(id);
  }

  @Delete(':id')
  deleteRequest(@Param('id') id: string, @User('id') studentId: string) {
    return this.scholarshipService.deleteRequest(id, studentId);
  }
}
