import jwt from 'jsonwebtoken';

export const generateToken = (userId: number) =>
	jwt.sign(
		{
			userId,
		},
		process.env.ACCESS_TOKEN as string,
		{
			expiresIn: '10d',
		},
	);
