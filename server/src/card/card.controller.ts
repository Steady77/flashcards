import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../prisma';
import { CardBody, TypedRequestBody } from '../types/express/request.interface';

export const createCard = asyncHandler(async (req: TypedRequestBody<CardBody>, res: Response) => {
	try {
		const { frontText, backText } = req.body;
		const deckId = req.params.deckId;

		const card = await prisma.card.create({
			data: {
				frontText,
				backText,
				deck: {
					connect: {
						id: Number(deckId),
					},
				},
			},
		});

		res.json(card);
	} catch (error: any) {
		console.log(error.message);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
});

export const updateCard = asyncHandler(async (req: TypedRequestBody<CardBody>, res: Response) => {
	try {
		const { frontText, backText } = req.body;
		const cardId = req.params.cardId;

		const card = await prisma.card.update({
			where: {
				id: Number(cardId),
			},
			data: {
				frontText,
				backText,
			},
		});

		res.json(card);
	} catch (error) {
		res.status(500).json({
			message: 'Something went wrong',
		});
	}
});

export const deleteCard = asyncHandler(async (req: Request, res: Response) => {
	try {
		const cardId = req.params.cardId;

		const card = await prisma.card.delete({
			where: {
				id: Number(cardId),
			},
		});

		res.json(card);
	} catch (error) {
		res.status(500).json({
			message: 'Something went wrong',
		});
	}
});
