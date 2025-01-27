import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { DonorsService } from './donors.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('donors')
export class DonorsController {
  constructor(private readonly donorsService: DonorsService) {}

  @Get('requests/verified')
  async browseVerifiedRequests() {
    return this.donorsService.browseVerifiedRequests();
  }

  @UseGuards(JwtAuthGuard)
  @Post('donations')
  async fundScholarshipRequest(@Req() req, @Body() body) {
    const donorId = req.user.id;
    const { requestId, amount } = body;
    return this.donorsService.fundScholarshipRequest(donorId, requestId, amount);
  }

  @UseGuards(JwtAuthGuard)
  @Get('donations/me')
  async viewMyDonations(@Req() req) {
    const donorId = req.user.id;
    return this.donorsService.viewMyDonations(donorId);
  }
}
