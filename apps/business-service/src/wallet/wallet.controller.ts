import { Controller, Post, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { RegisterClientDto, RechargeWalletDto } from './dto';

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
}
