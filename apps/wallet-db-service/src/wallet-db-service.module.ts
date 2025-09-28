import { Module } from '@nestjs/common';
import { WalletDbServiceController } from './wallet-db-service.controller';
import { WalletDbServiceService } from './wallet-db-service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes config available everywhere
    }),
  ],  
  controllers: [WalletDbServiceController],
  providers: [WalletDbServiceService],
})
export class WalletDbServiceModule {}
