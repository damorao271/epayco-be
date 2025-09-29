import { NestFactory } from '@nestjs/core';
import { DbServiceModule } from './db-service.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(DbServiceModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT_DB_SERVICE') || 3000;
  await app.listen(port);
}
bootstrap();
