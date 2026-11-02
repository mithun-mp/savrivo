import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { requestLogger } from './middleware/logger';
import { generalLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import { sendError } from './utils/response';
import { config } from './config/env';
import routes from './routes';

export function createApp() {
  const app = express();

  // Security headers
  app.use(helmet());

  // CORS
  app.use(cors({
    origin: (origin, callback) => {
      const allowed = [config.frontendOrigin, 'http://localhost:4321', 'http://localhost:3000'];
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }));

  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Logging
  app.use(requestLogger);

  // Global rate limit
  app.use('/api', generalLimiter);

  // Routes
  app.use('/api', routes);

  // 404
  app.use((_req, res) => {
    sendError(res, 'Route not found', 404, 'NOT_FOUND');
  });

  // Error handler
  app.use(errorHandler);

  return app;
}