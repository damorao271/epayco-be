import { NestFactory } from '@nestjs/core';
import { WalletApiServiceModule } from './wallet-api-service.module';

async function bootstrap() {
  const app = await NestFactory.create(WalletApiServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
