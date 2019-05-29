import { Router } from 'express';
import { productController } from '@/_controllers'
import { parseData, validateFindInstance } from '@/middleware'

import * as multer from 'multer'
const upload = multer({ dest: 'public/img/' })

const router = Router();

router.param("id", validateFindInstance('Products'));

router.get('/:id', productController.getById);
router.put('/:id', [upload.single('file'), parseData()], productController.edit);
router.get('/', productController.getAll);
router.post('/', [upload.single('file'), parseData()], productController.create);

export default router; 
