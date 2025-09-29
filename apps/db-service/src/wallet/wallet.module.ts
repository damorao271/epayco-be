import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Client } from './entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, Client])],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
