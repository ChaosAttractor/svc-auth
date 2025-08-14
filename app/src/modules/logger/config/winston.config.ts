import { transports, format } from 'winston';

import { DEFAULT_APP_CONTEXT, TIMESTAMP_FORMAT } from '../const';
import { WinstonLoggerConfig } from '../interfaces';

export default {
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({
          level: true,
          message: true,
        }),
        format.timestamp({ format: TIMESTAMP_FORMAT }),
        format.printf((info) => `${info.level}: [${info.context || info.stack || DEFAULT_APP_CONTEXT}] ${[info.timestamp]} ${info.message}`),
      ),
    }),
  ],
} as WinstonLoggerConfig;
