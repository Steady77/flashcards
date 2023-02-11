import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../prisma';

export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user?.id,
		},
		select: {
			id: true,
			createdAt: true,
			updatedAt: true,
			email: true,
			image: true,
			name: true,
			decks: {
				include: {
					cards: true,
				},
			},
		},
	});

	res.json(user);
});
