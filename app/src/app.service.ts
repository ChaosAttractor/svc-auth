import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import LoggerService from './modules/logger/logger.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private logger: LoggerService) {}

  onApplicationBootstrap(): void {
    this.logger.log(`
*******************************************************
* Auth service start listen:                          *
* - REST API port: ${+process.env.SVC_PORT || 8080}                               *
*******************************************************`, AppService.name);
  }
}
