import { Module } from '@nestjs/common';
import { BusinessServiceController } from './business-service.controller';
import { BusinessServiceService } from './business-service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes config available everywhere
    }),
  ],
  controllers: [BusinessServiceController],
  providers: [BusinessServiceService],
})
export class BusinessServiceModule {}
