import { Controller, Get } from '@nestjs/common';
import { WalletDbServiceService } from './wallet-db-service.service';

@Controller()
export class WalletDbServiceController {
  constructor(private readonly walletDbServiceService: WalletDbServiceService) {}

  @Get()
  getHello(): string {
    return this.walletDbServiceService.getHello();
  }
}
