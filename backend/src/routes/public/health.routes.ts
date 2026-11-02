import { Router } from 'express';
import { getDbStatus } from '../../database/connection';

const router = Router();

router.get('/', (_req, res) => {
  const dbStatus = getDbStatus();
  const isDbConnected = dbStatus === 'connected';

  // Return 200 OK when fully operational, 503 Service Unavailable when degraded
  const statusCode = isDbConnected ? 200 : 503;

  res.status(statusCode).json({
    success: isDbConnected,
    data: {
      status: isDbConnected ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      db: dbStatus,
    },
  });
});

export default router;