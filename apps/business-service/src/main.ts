import { NestFactory } from '@nestjs/core';
import { BusinessServiceModule } from './business-service.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(BusinessServiceModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT_BUSINESS_SERVICE') || 3000;
  await app.listen(port);
}
bootstrap();
