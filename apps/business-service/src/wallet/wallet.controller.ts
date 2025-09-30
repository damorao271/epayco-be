import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import {
  RegisterClientDto,
  RechargeWalletDto,
  PayDto,
  ConfirmPayDto,
} from './dto';

// This controller is consumed by the Web Client (Frontend)
@Controller('api/v1/wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // 1. Register Client
  @Post('register')
  register(@Body() dto: RegisterClientDto) {
    return this.walletService.registerClient(dto);
  }

  // 2. Recharge Wallet
  @Post('recharge')
  recharge(@Body() data: RechargeWalletDto) {
    return this.walletService.rechargeWallet(
      data.document,
      data.phone,
      data.amount,
    );
  }

  // 3. Check Balance
  @Get('balance')
  getBalance(
    @Query('document') document: string,
    @Query('phone') phone: string,
  ) {
    return this.walletService.checkBalance(document, phone);
  }

  // 4. Pay - Step 1: Generate Token
  @Post('pay')
  initiatePayment(@Body() data: PayDto) {
    return this.walletService.initiatePayment(
      data.document,
      data.phone,
      data.amount,
    );
  }

  // 4. Pay - Step 2: Confirm
  @Post('pay/confirm')
  confirmPayment(@Body() data: ConfirmPayDto) {
    return this.walletService.confirmPayment(data.sessionId, data.token);
  }
}
