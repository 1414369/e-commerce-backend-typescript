import { Router } from 'express';
import { shoppingCartController } from './controller'
import { validateFindInstance } from '@/middleware'
import itemsRoutes from './items'

const router = Router();

// param
router.param("id", validateFindInstance('ShoppingCarts'));

// sub route
router.use('/:id/items', itemsRoutes);

// operator
router.get('/:id', shoppingCartController.getById);
router.post('/', shoppingCartController.create);

export default router;
