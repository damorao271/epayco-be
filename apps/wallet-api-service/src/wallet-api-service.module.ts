import { Module } from '@nestjs/common';
import { WalletApiServiceController } from './wallet-api-service.controller';
import { WalletApiServiceService } from './wallet-api-service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes config available everywhere
    }),
  ],  
  controllers: [WalletApiServiceController],
  providers: [WalletApiServiceService],
})
export class WalletApiServiceModule {}
