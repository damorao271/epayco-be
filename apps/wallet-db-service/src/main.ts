import { NestFactory } from '@nestjs/core';
import { WalletDbServiceModule } from './wallet-db-service.module';

async function bootstrap() {
  const app = await NestFactory.create(WalletDbServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
