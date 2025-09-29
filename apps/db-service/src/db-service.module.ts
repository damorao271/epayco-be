import { Module } from '@nestjs/common';
import { DbServiceController } from './db-service.controller';
import { DbServiceService } from './db-service.service';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes config available everywhere
    }),
    WalletModule,
  ],
  controllers: [DbServiceController],
  providers: [DbServiceService],
})
export class DbServiceModule {}
