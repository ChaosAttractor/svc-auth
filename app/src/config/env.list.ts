import { EnvListInterface } from '../interfaces/checkEnv.interface';

export default {
  required: {},
  optional: {
    SVC_PORT: 'Service port, default - 8080',
    SVC_HOSTNAME: 'Service hostname, default - 0.0.0.0',

    LOKI_URL: 'Loki URL',
    LOKI_SOLUTION_NAME: 'Loki solution name',
    LOKI_SERVICE_NAME: 'Loki service name',
  },
} as EnvListInterface;
