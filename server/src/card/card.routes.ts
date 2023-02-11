import { Router } from 'express';
import { checkAuth } from '../middleware/auth.middleware';
import { createCard, deleteCard, updateCard } from './card.controller';

const router = Router();

router.route('/:deckId/card').post(checkAuth, createCard);
router.route('/:deckId/cards/:cardId').delete(checkAuth, deleteCard).put(checkAuth, updateCard);

export default router;
