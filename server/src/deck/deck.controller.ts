import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../prisma';
import { DeckBody, TypedRequestBody } from '../types/express/request.interface';

export const createDeck = asyncHandler(async (req: TypedRequestBody<DeckBody>, res: Response) => {
	const { title } = req.body;
	const id = req.user?.id;

	if (id) {
		const deck = await prisma.deck.create({
			data: {
				title,
				userId: id,
			},
		});

		res.json(deck);
	}
});

export const getAllDecks = asyncHandler(async (req: Request, res: Response) => {
	const id = req.user?.id;

	const decks = await prisma.deck.findMany({
		where: {
			userId: id,
		},
		include: {
			cards: true,
		},
	});

	res.json(decks);
});
