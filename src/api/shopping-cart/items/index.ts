import { Router } from 'express';
import * as _ from 'lodash';
import { validate } from '@/middleware'
import { validate as productValidate } from '@/api/products/model'
import paramController from './param'
import controller from './controller'

const router = Router();

router.param("productId", paramController.productId);

router.get('/:productId', controller.getById);

router.put('/:productId', controller.edit);

router.post('/:productId', validate(productValidate, "product"), controller.create);

export default router;
