import { Router } from 'express';
import { authController } from '@/_controllers'
const router = Router();

router.post('/', authController.login);

export default router; 
