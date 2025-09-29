import { Module } from '@nestjs/common';
import { BusinessServiceController } from './business-service.controller';
import { BusinessServiceService } from './business-service.service';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes config available everywhere
    }),
    WalletModule,
  ],
  controllers: [BusinessServiceController],
  providers: [BusinessServiceService],
})
export class BusinessServiceModule {}
