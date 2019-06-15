import { authenticate, admin } from '@/middleware';
import { Router } from 'express';
import { productCategoryController } from './controller'

const router = Router();


router.get('/', productCategoryController.getList);

router.post('/', [authenticate, admin], productCategoryController.create);

export default router; 
