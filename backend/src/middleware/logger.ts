import morgan from 'morgan';
import { config } from '../config/env';

export const requestLogger = morgan(config.isDev ? 'dev' : 'combined');