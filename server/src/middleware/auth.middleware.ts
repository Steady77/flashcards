import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';

interface JwtPayload {
	userId: number;
}

export const checkAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	let token;

	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];

		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

		const userFound = await prisma.user.findUnique({
			where: {
				id: decoded.userId,
			},
			select: {
				id: true,
				createdAt: true,
				email: true,
				image: true,
				updatedAt: true,
				name: true,
			},
		});

		if (userFound) {
			req.user = userFound;
			next();
		} else {
			res.status(401);
			throw new Error('Not authorized');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorized');
	}
});
