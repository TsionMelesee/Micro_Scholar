import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ScholarshipRequest } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ScholarshipService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async createRequest(
    data: Omit<Prisma.ScholarshipRequestCreateInput, 'student'>,
    token: string
  ): Promise<ScholarshipRequest> {
    const rawToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
  
    let decoded: any;
    try {
      decoded = this.jwtService.verify(rawToken); 
      console.log('Decoded Token:', decoded);
    } catch (error) {
      console.error('Error verifying token:', error.message);
      throw new Error('Invalid or expired token');
    }
  
    const studentId = decoded.userId;
    if (!studentId) {
      throw new Error('UserId not found in token');
    }
  
    return this.prisma.scholarshipRequest.create({
      data: {
        ...data,
        status: data.status || 'PENDING',
        student: {
          connect: { id: studentId },
        },
      },
    });
  }
  
  async getRequests(studentId: string): Promise<ScholarshipRequest[]> {
    return this.prisma.scholarshipRequest.findMany({ where: { studentId } });
  }

  async getRequestById(id: string): Promise<ScholarshipRequest | null> {
    return this.prisma.scholarshipRequest.findUnique({ where: { id } });
  }

  async deleteRequest(id: string, studentId: string): Promise<ScholarshipRequest | null> {
    const request = await this.prisma.scholarshipRequest.findUnique({ where: { id } });
    if (request && request.studentId === studentId && request.status === 'PENDING') {
      return this.prisma.scholarshipRequest.delete({ where: { id } });
    }
    return null;
  }
  async getApprovedRequests(): Promise<ScholarshipRequest[]> {
    return this.prisma.scholarshipRequest.findMany({
      where: { status: 'APPROVED' },
      include: { student: true, donations: true },
    });
  }
  
  
}
