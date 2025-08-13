import {
  ConsoleLogger,
  Inject,
  Injectable,
  LoggerService as NestLoggerService,
} from '@nestjs/common';

import { WinstonModule } from 'nest-winston';
import LokiTransport from 'winston-loki';
import * as moment from 'moment';

import { DEFAULT_APP_CONTEXT, LOGGER_CONFIG, TIMESTAMP_FORMAT } from './const';

import winstonConfig from './config/winston.config';

import { LoggerConfigInterface, LoggerData } from './interfaces';

import { dataType } from './types';

import isEmptyObject from './utils/isEmptyObject';
import { LoggerMethods } from './enums';

@Injectable()
export default class LoggerService extends ConsoleLogger {
  private readonly winston: NestLoggerService;

  constructor(@Inject(LOGGER_CONFIG) private config: LoggerConfigInterface) {
    super();

    const configCopy = { ...this.config };
    configCopy.winston = configCopy.winston || winstonConfig;

    if (configCopy.loki) {
      configCopy.winston.transports.push(new LokiTransport(configCopy.loki));
    }

    this.winston = WinstonModule.createLogger(configCopy.winston);
  }

  /**
   * Show log message
   * @param message
   * @param context
   * @param data
   * @param contextId
   */
  log(message: string, context?: string, data: dataType = {}, contextId: string = ''): void {
    this.logWrapper({
      message,
      data,
      context,
      method: LoggerMethods.Log,
      contextId,
    });
  }

  /**
   * Show warn message
   * @param message
   * @param context
   * @param data
   * @param contextId
   */
  warn(message: string, context?: string, data: dataType = {}, contextId: string = ''): void {
    this.logWrapper({
      message,
      data,
      context,
      method: LoggerMethods.Warn,
      contextId,
    });
  }

  /**
   * Show error message
   * @param message
   * @param context
   * @param data
   * @param contextId
   */
  error(message: string, context?: string, data: dataType = {}, contextId: string = ''): void {
    this.logWrapper({
      message,
      data,
      context,
      method: LoggerMethods.Error,
      contextId,
    });
  }

  /**
   * Show debug message
   * @param message
   * @param context
   * @param data
   * @param contextId
   */
  debug(message: string, context?: string, data: dataType = {}, contextId: string = ''): void {
    this.logWrapper({
      message,
      data,
      context,
      method: LoggerMethods.Debug,
      contextId,
    });
  }

  /**
   * log wrapper, use winston method
   * @param loggerData
   * @private
   */
  private logWrapper(loggerData: LoggerData): void {
    const {
      method, message, data, context, contextId,
    } = loggerData;

    const ctx = LoggerService.getContext(context);

    const msg = LoggerService.buildMessage(message, data, contextId);
    this.winston[method](msg, ctx);

    if (method === LoggerMethods.Debug) {
      console.debug(`debug: [${ctx}] ${moment().format(TIMESTAMP_FORMAT)} ${msg}`);
    }
  }

  /**
   * Get log context
   * @param context
   * @private
   * @static
   */
  private static getContext(context: string): string {
    return context || DEFAULT_APP_CONTEXT;
  }

  /**
   * build logger message
   * @param message
   * @param payload
   * @param contextId
   * @private
   * @static
   */
  private static buildMessage(message: string, payload: dataType = {}, contextId: string = ''): string {
    if (typeof payload === 'string') {
      return `${message} || ${payload} || ${contextId}`;
    }
    const data = { ...payload };
    if (contextId) {
      data.contextId = contextId;
    }
    const dataString = data && !isEmptyObject(data) ? ` || ${JSON.stringify(data)}` : '';
    return `${message}${dataString}`;
  }
}
