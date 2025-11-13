import { Router } from 'express';
import { authController } from './auth.controller';
import { authenticate, requireRole } from '../../middleware/auth.middleware';

const router = Router();

router.post('/login', authController.login);
router.post('/register', authenticate, requireRole('ADMIN'), authController.register);
router.post('/refresh', authController.refresh);

export default router;

