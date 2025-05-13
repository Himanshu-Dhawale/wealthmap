import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { authRouter } from './routes/auth.routes';
import invitationRouter from './routes/invitation.routes';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();
app.use(cors());
app.route('/auth', authRouter);
app.route('/company-onboarding', invitationRouter);

export default app;
