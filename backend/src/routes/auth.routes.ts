import { Hono } from 'hono';
import { registerCompany, login } from '../controllers/auth.controller';

export const authRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

authRouter.post('/register', registerCompany);
authRouter.post('/login', login);
