import { Hono } from 'hono';
import { getAllProperties, getPropertyById } from '../controllers/property.controller';
import { verifyToken } from '../middleware/auth.middleware';

const propertyRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

propertyRouter.use(verifyToken);
propertyRouter.get('/', getAllProperties);
propertyRouter.get('/:id', getPropertyById);

export default propertyRouter;
