import { Hono } from 'hono';
import { registerCompany, login, setupMfa, verifyMfaSetup } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/auth.middleware';

export const authRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

authRouter.post('/register', registerCompany);
authRouter.post('/login', login);
authRouter.get('/mfa/setup', verifyToken, setupMfa);
authRouter.post('/mfa/verify', verifyToken, verifyMfaSetup);
