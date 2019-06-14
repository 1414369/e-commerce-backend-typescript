import { Router } from 'express';
import { orderController } from './controller'
import { validateFindInstance, authenticate, admin } from '@/middleware'

const router = Router();

router.param("id", validateFindInstance('Orders'));

router.get('/:id', orderController.getById);
router.delete('/:id', orderController.delete);

router.get('/', [authenticate], orderController.getAll);
router.post('/', orderController.create);

export default router; 
