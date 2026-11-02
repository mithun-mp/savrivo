import { Router } from 'express';
import {
  adminListCategories,
  createCategory,
  updateCategory,
} from '../../controllers/category.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);
router.get('/', adminListCategories);
router.post('/', createCategory);
router.patch('/:id', updateCategory);
export default router;