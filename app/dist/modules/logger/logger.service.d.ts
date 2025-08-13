import { ConsoleLogger } from '@nestjs/common';
import { LoggerConfigInterface } from './interfaces';
import { dataType } from './types';
export default class LoggerService extends ConsoleLogger {
    private config;
    private readonly winston;
    constructor(config: LoggerConfigInterface);
    log(message: string, context?: string, data?: dataType, contextId?: string): void;
    warn(message: string, context?: string, data?: dataType, contextId?: string): void;
    error(message: string, context?: string, data?: dataType, contextId?: string): void;
    debug(message: string, context?: string, data?: dataType, contextId?: string): void;
    private logWrapper;
    private static getContext;
    private static buildMessage;
}
