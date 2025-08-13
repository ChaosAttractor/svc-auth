import { DynamicModule, Global, Module } from '@nestjs/common';

import { LOGGER_CONFIG } from './const';

import { LoggerConfigInterface } from './interfaces';

import LoggerService from './logger.service';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(cfg: LoggerConfigInterface): DynamicModule {
    return {
      module: LoggerModule,
      exports: [LoggerService],
      providers: [
        {
          useValue: cfg,
          provide: LOGGER_CONFIG,
        },
        LoggerService,
      ],
    };
  }
}
