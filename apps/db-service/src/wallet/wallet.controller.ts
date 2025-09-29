import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateClientDto } from './dto/create-client.dto';

// This controller is consumed ONLY by the Business Service
@Controller('db-api/wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('register-client')
  create(@Body() createCLient: CreateClientDto) {
    return this.walletService.createClient(createCLient);
  }
}
