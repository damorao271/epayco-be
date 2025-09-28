import { Controller, Get } from '@nestjs/common';
import { WalletApiServiceService } from './wallet-api-service.service';

@Controller()
export class WalletApiServiceController {
  constructor(private readonly walletApiServiceService: WalletApiServiceService) {}

  @Get()
  getHello(): string {
    return this.walletApiServiceService.getHello();
  }
}
