import { Router } from 'express';
import { loginUser, registerUser } from './auth.controller';

const router = Router();

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);

export default router;
