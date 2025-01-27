import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DonorsService {
  constructor(private prisma: PrismaService) {}

  async browseVerifiedRequests() {
    return this.prisma.scholarshipRequest.findMany({
      where: {
        status: 'VERIFIED',
        fundedAmount: {
          lt: this.prisma.scholarshipRequest.fields.requestedAmount,
        },
      },
    });
  }

  async fundScholarshipRequest(donorId: string, requestId: string, amount: number) {
    return this.prisma.$transaction(async (prisma) => {
      const request = await prisma.scholarshipRequest.findUnique({
        where: { id: requestId },
      });

      if (!request || request.status !== 'VERIFIED') {
        throw new Error('Request not verified or does not exist');
      }

      const updatedRequest = await prisma.scholarshipRequest.update({
        where: { id: requestId },
        data: {
          fundedAmount: {
            increment: amount,
          },
          status: request.fundedAmount + amount >= request.requestedAmount ? 'FUNDED' : request.status,
        },
      });

      await prisma.donation.create({
        data: {
          donorId,
          requestId,
          amount,
        },
      });

      return updatedRequest;
    });
  }

  async viewMyDonations(donorId: string) {
    return this.prisma.donation.findMany({
      where: {
        donorId,
      },
      include: {
        request: true,
      },
    });
  }
}
