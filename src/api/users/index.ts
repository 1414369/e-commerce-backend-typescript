import { Router } from 'express';
import { userController } from './controller'
// const auth = require('../middleware/auth');

const router = Router();

router.get('/me', userController.getMyInfo);

router.post('/', userController.createUser);

export default router; 
