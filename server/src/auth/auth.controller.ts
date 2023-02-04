import { Request, Response } from 'express';
import { prisma } from '../prisma';
import asyncHandler from 'express-async-handler';
import { faker } from '@faker-js/faker/locale/ru';
import { hash } from 'argon2';
import { generateToken } from './generate-token';

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
	const user = await prisma.user.findMany();

	res.json(user);
});

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
	const { email, password }: { email: string; password: string } = req.body;

	const isHaveUser = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (isHaveUser) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await prisma.user.create({
		data: {
			email,
			password: await hash(password),
			name: faker.name.fullName(),
			image: '',
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

	const token = generateToken(user.id);

	res.json({ user, token });
});
