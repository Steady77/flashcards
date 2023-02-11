import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../prisma';
import { DeckBody, TypedRequestBody } from '../types/express/request.interface';

export const createDeck = asyncHandler(async (req: TypedRequestBody<DeckBody>, res: Response) => {
	try {
		const { title } = req.body;
		const userId = req.user?.id;

		const deck = await prisma.deck.create({
			data: {
				title,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		});

		res.json(deck);
	} catch (error: any) {
		console.log(error.message);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
});

export const deleteDeck = asyncHandler(async (req: Request, res: Response) => {
	try {
		const deckId = req.params.deckId;

		const deck = await prisma.deck.delete({
			where: {
				id: Number(deckId),
			},
			include: {
				cards: true,
			},
		});

		res.json(deck);
	} catch (error) {
		res.status(500).json({
			message: 'Something went wrong',
		});
	}
});

export const updateDeck = asyncHandler(async (req: TypedRequestBody<DeckBody>, res: Response) => {
	try {
		const { title } = req.body;
		const deckId = req.params.deckId;

		const deck = await prisma.deck.update({
			where: {
				id: Number(deckId),
			},
			data: {
				title: title,
			},
			include: {
				cards: true,
			},
		});

		res.json(deck);
	} catch (error) {
		res.status(500).json({
			message: 'Something went wrong',
		});
	}
});

export const getAllDecks = asyncHandler(async (req: Request, res: Response) => {
	try {
		const id = req.user?.id;

		const decks = await prisma.deck.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			where: {
				userId: id,
			},
			include: {
				cards: true,
			},
		});

		res.json(decks);
	} catch (error) {
		res.status(500).json({
			message: 'Something went wrong',
		});
	}
});
