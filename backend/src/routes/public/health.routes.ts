import { Router } from 'express';
import { getDbStatus } from '../../database/connection';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      db: getDbStatus(),
    },
  });
});

export default router;