import { Hono } from 'hono';
import {
	registerCompany,
	login,
	setupMfa,
	verifyMfaSetup,
	getMfaStatus,
	requestEmailVerification,
	verifyEmail,
	forgotPassword,
	resetPassword,
} from '../controllers/auth.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { onlyEmployee } from '../middleware/only-employee.middleware';

export const authRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

authRouter.post('/register', registerCompany);
authRouter.post('/login', login);
authRouter.get('/mfa/setup', verifyToken, onlyEmployee, setupMfa);
authRouter.post('/mfa/verify', verifyToken, onlyEmployee, verifyMfaSetup);
authRouter.get('/mfa/status', verifyToken, onlyEmployee, getMfaStatus);
authRouter.post('/request-verification', requestEmailVerification);
authRouter.get('/verify-email', verifyEmail);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password', resetPassword);
