import { Router } from 'express';
import { checkAuth } from '../middleware/auth.middleware';
import { createDeck, getAllDecks } from './deck.controller';

const router = Router();

router.route('/').post(checkAuth, createDeck).get(checkAuth, getAllDecks);

export default router;
