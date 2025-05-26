import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { authRouter } from './routes/auth.routes';
import invitationRouter from './routes/invitation.routes';
import companyRouter from './routes/company.routes';
import propertyRouter from './routes/property.routes';
import bookmarkRouter from './routes/bookmark.routes';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();
app.use(cors());
app.route('/auth', authRouter);
app.route('/company-onboarding', invitationRouter);
app.route('/company', companyRouter);
app.route('/properties', propertyRouter);
app.route('/property', bookmarkRouter);

export default app;
