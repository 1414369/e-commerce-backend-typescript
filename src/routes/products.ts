import { Router } from 'express';
import { productController } from '@/_controllers'

import * as multer from 'multer'
const upload = multer({ dest: 'public/img/' })

const router = Router();

router.get('/:id', productController.getProductById);
router.get('/', productController.getAllProduct);
router.post('/', upload.single('file'), productController.createProduct);
router.put('/', upload.single('file'), productController.editProduct);

export default router; 
