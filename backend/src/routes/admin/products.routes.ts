import { Router } from 'express';
import {
  adminListProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} from '../../controllers/product.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);
router.get('/', adminListProducts);
router.get('/:id', getProduct); // Note: this uses id not slug for admin
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);
export default router;