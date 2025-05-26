import { Hono } from 'hono';
import { searchOwners } from '../controllers/owner.controller';

export const ownerRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

ownerRouter.get('/search', searchOwners);

export default ownerRouter;
