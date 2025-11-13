import { Router } from 'express';
import { userController } from './user.controller';
import { authenticate, requireRole } from '../../middleware/auth.middleware';

const router = Router();

// All routes require authentication and ADMIN role
router.use(authenticate);
router.use(requireRole('ADMIN'));

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;

