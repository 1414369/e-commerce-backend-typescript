import { Router } from 'express';
import { productController } from './controller'
import { parseData, validateFindInstance, authenticate, admin } from '@/middleware'
import categories from "./categories";

import * as multer from 'multer'
const upload = multer({ dest: 'public/img/' })

const router = Router();
router.use("/category", categories)

router.param("id", validateFindInstance('Products'));

router.get('/:id', productController.getById);
router.put('/:id', [authenticate, admin, upload.single('file'), parseData()], productController.edit);
router.delete('/:id', [authenticate, admin], productController.delete);

router.get('/', productController.getAll);
router.post('/', [authenticate, admin, upload.single('file'), parseData()], productController.create);

export default router; 
