import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { BasketModule } from './basket.module';


async function bootstrap() {
  const app = await NestFactory.create(BasketModule);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
