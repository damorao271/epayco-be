import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';

// This controller is consumed ONLY by the Business Service
@Controller('db-api/wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('register-client')
  create(@Body() data: any) {
    return this.walletService.createClient(data);
  }
}
