import { Module } from '@nestjs/common';
import { WalletApiServiceController } from './wallet-api-service.controller';
import { WalletApiServiceService } from './wallet-api-service.service';

@Module({
  imports: [],
  controllers: [WalletApiServiceController],
  providers: [WalletApiServiceService],
})
export class WalletApiServiceModule {}
