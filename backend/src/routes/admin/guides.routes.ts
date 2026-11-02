import { Router } from 'express';
import {
  adminListGuides,
  createGuide,
  updateGuide,
} from '../../controllers/guide.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);
router.get('/', adminListGuides);
router.post('/', createGuide);
router.patch('/:id', updateGuide);
export default router;