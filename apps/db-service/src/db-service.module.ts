import { Module } from '@nestjs/common';
import { DbServiceController } from './db-service.controller';
import { DbServiceService } from './db-service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes config available everywhere
    }),
  ],
  controllers: [DbServiceController],
  providers: [DbServiceService],
})
export class DbServiceModule {}
