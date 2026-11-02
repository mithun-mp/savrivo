import { Router } from 'express';
import {
  adminListMerchants,
  createMerchant,
  updateMerchant,
  toggleMerchant,
} from '../../controllers/merchant.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);
router.get('/', adminListMerchants);
router.post('/', createMerchant);
router.patch('/:id', updateMerchant);
router.post('/:id/toggle', toggleMerchant);
export default router;