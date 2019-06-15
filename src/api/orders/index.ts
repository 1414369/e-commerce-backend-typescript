import { Router } from 'express';
import { orderController } from './controller'
import { validateFindInstance, authenticate, userOnly, checkAvailable } from '@/middleware'

const router = Router();

router.param("id", validateFindInstance('Orders'));

router.get('/:id', [authenticate, checkAvailable], orderController.getById);
router.delete('/:id', [authenticate, userOnly, checkAvailable], orderController.delete);

router.get('/', [authenticate], orderController.getAll);
router.post('/', [authenticate], orderController.create);

export default router; 
