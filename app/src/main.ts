import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

import LoggerService from './modules/logger/logger.service';

import loggerConfig from './config/logger.config';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new LoggerService(loggerConfig),
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: false }));

  app.enableCors({
    credentials: true,
    origin: true,
  });

  app.set('query parser', 'extended');

  const port = +process.env.SVC_PORT || 8080;
  const hostname = process.env.SVC_HOSTNAME || '0.0.0.0';
  await app.listen(port, hostname);
};
bootstrap();
