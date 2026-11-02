import { Router } from 'express';

const router = Router();

// Offers feature is coming soon — architecture is ready but live data is not enabled
router.get('/', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'coming_soon',
      message: 'Live offer discovery is on its way. We\'re building a verified way to compare product offers across trusted retailers.',
      available: false,
    },
  });
});

export default router;