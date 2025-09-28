import { NestFactory } from '@nestjs/core';
import { WalletDbServiceModule } from './wallet-db-service.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(WalletDbServiceModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('CONTAINER_PORT') || 3000;
  await app.listen(port);
}
bootstrap();
