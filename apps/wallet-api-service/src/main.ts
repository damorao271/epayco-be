import { NestFactory } from '@nestjs/core';
import { WalletApiServiceModule } from './wallet-api-service.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(WalletApiServiceModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT_WALLET_API') || 3000;
  await app.listen(port);
}
bootstrap();