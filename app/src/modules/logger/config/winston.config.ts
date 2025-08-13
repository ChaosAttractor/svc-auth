import * as winston from 'winston';

import { DEFAULT_APP_CONTEXT, TIMESTAMP_FORMAT } from '../const';

import { WinstonLoggerConfig } from '../interfaces';

const transports: winston.transports.ConsoleTransportInstance[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({
        level: true,
        message: true,
      }),
      winston.format.timestamp({ format: TIMESTAMP_FORMAT }),
      winston.format.printf((info) => `${info.level}: [${info.context || info.stack || DEFAULT_APP_CONTEXT}] ${[info.timestamp]} ${info.message}`),
    ),
  }),
];

export default {
  transports,
} as WinstonLoggerConfig;
