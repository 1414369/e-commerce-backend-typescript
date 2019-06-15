import { Router } from 'express';
import { orderController } from './controller'
import { validateFindInstance, authenticate, admin, userOnly } from '@/middleware'

const router = Router();

router.param("id", validateFindInstance('Orders'));

router.get('/:id', [authenticate], orderController.getById);
router.delete('/:id', [authenticate, userOnly], orderController.delete);

router.get('/', [authenticate], orderController.getAll);
router.post('/', [authenticate], orderController.create);

export default router; 
