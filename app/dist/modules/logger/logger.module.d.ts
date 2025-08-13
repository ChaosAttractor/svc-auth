import { DynamicModule } from '@nestjs/common';
import { LoggerConfigInterface } from './interfaces';
export declare class LoggerModule {
    static forRoot(cfg: LoggerConfigInterface): DynamicModule;
}
