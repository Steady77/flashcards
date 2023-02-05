import { Router } from 'express';
import { checkAuth } from '../middleware/auth.middleware';
import { getUserProfile } from './user.controller';

const router = Router();

router.route('/profile').get(checkAuth, getUserProfile);

export default router;
