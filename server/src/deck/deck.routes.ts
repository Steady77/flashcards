import { Router } from 'express';
import { checkAuth } from '../middleware/auth.middleware';
import { createDeck, deleteDeck, getAllDecks, updateDeck } from './deck.controller';

const router = Router();

router.route('/').post(checkAuth, createDeck).get(checkAuth, getAllDecks);
router.route('/:deckId').delete(checkAuth, deleteDeck).put(checkAuth, updateDeck);

export default router;
