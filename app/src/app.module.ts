import { Module } from '@nestjs/common';

import { AppService } from './app.service';

import { LoggerModule } from './modules/logger/logger.module';

import loggerConfig from './config/logger.config';

@Module({
  imports: [
    LoggerModule.forRoot(loggerConfig),
  ],
  providers: [AppService],
})
export class AppModule {}
