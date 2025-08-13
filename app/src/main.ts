import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

import LoggerService from './modules/logger/logger.service';

import loggerConfig from './config/logger.config';

import checkEnv from './utils/checkEnv';
import envList from './config/env.list';

const bootstrap = async (): Promise<void> => {
  const logger = new LoggerService(loggerConfig);

  checkEnv(envList, logger);

  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger });

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
