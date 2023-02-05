import jwt from 'jsonwebtoken';

export const generateToken = (userId: number) =>
	jwt.sign(
		{
			userId,
		},
		process.env.JWT_SECRET as string,
		{
			expiresIn: '10d',
		},
	);
