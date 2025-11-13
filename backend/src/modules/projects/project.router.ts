import { Router } from 'express';
import { projectController } from './project.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', projectController.getAll);
router.get('/client/:clientId', projectController.getByClientId);
router.get('/:id', projectController.getById);
router.post('/', projectController.create);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.delete);

export default router;

