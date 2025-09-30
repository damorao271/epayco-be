import { NestFactory } from '@nestjs/core';
import { BusinessServiceModule } from './business-service.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(BusinessServiceModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT_CONTAINER') || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(port);
}
bootstrap();
