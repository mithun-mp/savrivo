import { Router } from 'express';
import { login, logout } from '../../controllers/auth.controller';
import { authLimiter } from '../../middleware/rateLimiter';

const router = Router();
router.post('/login', authLimiter, login);
router.post('/logout', logout);
export default router;