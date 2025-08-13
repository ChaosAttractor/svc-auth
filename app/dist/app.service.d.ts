import { OnApplicationBootstrap } from '@nestjs/common';
import LoggerService from './modules/logger/logger.service';
export declare class AppService implements OnApplicationBootstrap {
    private logger;
    constructor(logger: LoggerService);
    onApplicationBootstrap(): void;
}
