import { Module } from '@nestjs/common';
import { WalletDbServiceController } from './wallet-db-service.controller';
import { WalletDbServiceService } from './wallet-db-service.service';

@Module({
  imports: [],
  controllers: [WalletDbServiceController],
  providers: [WalletDbServiceService],
})
export class WalletDbServiceModule {}
