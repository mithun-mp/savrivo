import { createApp } from './app';
import { connectDatabase } from './database/connection';
import { config } from './config/env';

async function start() {
  try {
    await connectDatabase();
    const app = createApp();
    const server = app.listen(config.port, () => {
      console.log(`[Server] SAVRIVO API running on port ${config.port} (${config.nodeEnv})`);
      console.log(`[Server] Health check: http://localhost:${config.port}/api/health`);
    });

    const graceful = () => {
      console.log('[Server] Shutting down gracefully...');
      server.close(() => process.exit(0));
    };
    process.on('SIGTERM', graceful);
    process.on('SIGINT', graceful);
  } catch (err) {
    console.error('[Server] Fatal startup error:', err);
    process.exit(1);
  }
}

start();