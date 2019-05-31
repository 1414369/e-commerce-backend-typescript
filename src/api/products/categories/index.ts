import { Router } from 'express';
import { productCategoryController } from './controller'

const router = Router();


router.get('/', productCategoryController.getList);

router.post('/', productCategoryController.create);

export default router; 
