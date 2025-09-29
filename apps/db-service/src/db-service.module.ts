import { Module } from '@nestjs/common';
import { DbServiceController } from './db-service.controller';
import { DbServiceService } from './db-service.service';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from './wallet/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'nestdb',
      autoLoadEntities: true,
      synchronize: true, // set to false in production!
    }),
    WalletModule,
  ],
  controllers: [DbServiceController],
  providers: [DbServiceService],
})
export class DbServiceModule {}
