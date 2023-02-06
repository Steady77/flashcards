import { Request } from 'express';

export interface TypedRequestBody<T> extends Request {
	body: T;
}

export interface AuthBody {
	email: string;
	password: string;
}

export interface CardBody {
	frontText: string;
	backText: string;
}

export interface DeckBody {
	title: string;
}
