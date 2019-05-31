import { Router } from 'express';
import * as _ from 'lodash';
import { validate } from '@/middleware'
import { validate as productValidate } from '@/api/products/model'
import controller from './controller'

const router = Router();

// param
router.param("productId", controller.productId);

// sub route

// operators
router.get('/:productId', controller.getById);
router.post('/:productId', controller.add);
router.put('/:productId', controller.remove);


// router.post('/:productId', validate(productValidate, "product"), controller.add);

export default router;
