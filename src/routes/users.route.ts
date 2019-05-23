import { Router } from 'express';
import { usersController } from '@/_controllers'
// const auth = require('../middleware/auth');

const router = Router();

router.get('/me', usersController.getMyInfo);

router.post('/', usersController.createUser);

export default router; 
