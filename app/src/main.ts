import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

import LoggerService from './modules/logger/logger.service';

import loggerConfig from './config/logger.config';
import envList from './config/env.list';

import checkEnv from './utils/checkEnv';

const bootstrap = async (): Promise<void> => {
  const logger = new LoggerService(loggerConfig);

  checkEnv(envList, logger);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    logger,
    transport: Transport.TCP,
    options: {
      host: process.env.SVC_HOSTNAME || '0.0.0.0',
      port: +process.env.SVC_PORT || 8080,
    },
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: false }));

  await app.listen();
};
bootstrap();
