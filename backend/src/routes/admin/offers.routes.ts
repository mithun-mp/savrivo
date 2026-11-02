import { Router } from 'express';
import {
  listOffers,
  createOffer,
  updateOffer,
  expireOffer,
} from '../../controllers/offer.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);
router.get('/', listOffers);
router.post('/', createOffer);
router.patch('/:id', updateOffer);
router.post('/:id/expire', expireOffer);
export default router;