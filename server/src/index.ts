import express from 'express';
import authRoutes from './auth/auth.routes';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { prisma } from './prisma';
import { errorHandler, notFound } from './middleware/error.middleware';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

	app.use(express.json());
	app.use('/api/auth', authRoutes);
	app.use(notFound);
	app.use(errorHandler);

	app.listen(PORT, () => {
		console.log('Server started');
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
