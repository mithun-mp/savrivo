import { Router } from 'express';
import { getSettings, updateSettings } from '../../controllers/settings.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);
router.get('/', getSettings);
router.patch('/', updateSettings);
export default router;