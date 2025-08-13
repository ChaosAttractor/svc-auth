import { LoggerOptions } from 'winston';
import * as Transport from 'winston-transport';
import TransportStream from 'winston-transport';

import { dataType } from '../types';
import { LoggerMethods } from '../enums';

export interface WinstonLoggerConfig extends LoggerOptions {
  transports: Transport[];
}

export interface LokiTransportConfig extends TransportStream.TransportStreamOptions {
  host: string;
  basicAuth?: string;
  headers?: object;
  interval?: number;
  json?: boolean;
  batching?: boolean;
  labels?: object;
  clearOnError?: boolean;
  replaceTimestamp?: boolean;
  gracefulShutdown?: boolean;
  timeout?: number;
  onConnectionError?(error: unknown): void;
}

export interface LoggerConfigInterface {
  winston?: WinstonLoggerConfig;
  loki?: LokiTransportConfig;
}

export interface LoggerData {
  method: LoggerMethods;
  context: string;
  message: string;
  data: dataType;
  contextId: string;
}
