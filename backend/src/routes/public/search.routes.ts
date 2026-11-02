import { Router } from 'express';
import { searchAll } from '../../controllers/search.controller';
import { searchLimiter } from '../../middleware/rateLimiter';

const router = Router();
router.get('/', searchLimiter, searchAll);
export default router;