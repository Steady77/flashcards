import { Response } from 'express';
import { prisma } from '../prisma';
import asyncHandler from 'express-async-handler';
import { faker } from '@faker-js/faker/locale/ru';
import { hash, verify } from 'argon2';
import { generateToken } from './generate-token';
import { AuthBody, TypedRequestBody } from '../types/express/request.interface';

export const loginUser = asyncHandler(async (req: TypedRequestBody<AuthBody>, res: Response) => {
	const { email, password } = req.body;

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (user) {
		const isValidPassword = await verify(user.password, password);

		if (isValidPassword) {
			const token = generateToken(user.id);
			res.json({ user, token });
		} else {
			res.status(401);
			throw new Error('Email or password are not correct');
		}

		res.json(user);
	}
});

export const registerUser = asyncHandler(async (req: TypedRequestBody<AuthBody>, res: Response) => {
	const { email, password } = req.body;

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
