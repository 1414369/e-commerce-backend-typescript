import { Router } from 'express';
import { shoppingCartController } from './controller'
import { validateFindInstance } from '@/middleware'
import itemsRoutes from './items'

const router = Router();

router.param("id", validateFindInstance('ShoppingCarts'));

router.use('/:id/items', itemsRoutes);

// router.put('/:id', [upload.single('file'), parseData()], productController.edit);
// router.delete('/:id', productController.delete);
// router.get('/', productController.getAll);
router.get('/:id', shoppingCartController.getById);
router.post('/', shoppingCartController.create);

export default router;
