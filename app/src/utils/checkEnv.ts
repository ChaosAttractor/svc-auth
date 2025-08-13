import LoggerService from '../modules/logger/logger.service';

import { EnvListInterface } from '../interfaces/checkEnv.interface';

const context = 'CheckEnv';

/**
 * Match envList with actual env
 * @param envList
 */
const getMissingEnv = (
  envList: Record<string, string>,
): string[] => Object.keys(envList).filter((key) => !process.env[key]);

/**
 * Prepare missing env list for logger
 * @param missingEnvList
 * @param envList
 */
const prettifyEnvLog = (missingEnvList: string[], envList: Record<string, string>): string => {
  const logObject = {};

  missingEnvList.forEach((key) => {
    logObject[key] = envList[key];
  });

  return Object.keys(logObject).map((key) => `${key}: ${logObject[key]}`).join('\n');
};

/**
 * Check env
 * @param envList
 * @param logger
 */
export default (envList: EnvListInterface, logger: LoggerService) => {
  const missingRequiredEnv = getMissingEnv(envList.required);
  const missingOptionalEnv = getMissingEnv(envList.optional);

  if (missingOptionalEnv.length) {
    const envLog = prettifyEnvLog(missingOptionalEnv, envList.optional);
    logger.warn(`Missing optional env:\n\n${envLog}\n`, context);
  }

  if (missingRequiredEnv.length) {
    const envLog = prettifyEnvLog(missingRequiredEnv, envList.required);
    logger.error(`Missing required env:\n\n${envLog}\n`, context);
    throw new Error('Missing required env');
  }
};
