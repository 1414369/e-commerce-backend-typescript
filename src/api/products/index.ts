import { Router } from 'express';
import { productController } from './controller'
import { parseData, validateFindInstance } from '@/middleware'
import categories from "./categories";

import * as multer from 'multer'
const upload = multer({ dest: 'public/img/' })

const router = Router();
router.use("/category", categories)

router.param("id", validateFindInstance('Products'));

router.get('/:id', productController.getById);
router.put('/:id', [upload.single('file'), parseData()], productController.edit);
router.delete('/:id', productController.delete);

router.get('/', productController.getAll);
router.post('/', [upload.single('file'), parseData()], productController.create);

export default router; 
