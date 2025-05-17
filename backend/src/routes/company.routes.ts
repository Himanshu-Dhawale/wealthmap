import { Hono } from 'hono';
import { verifyToken } from '../middleware/auth.middleware';
import {
	deactivateEmployee,
	getCompanyProfile,
	getCompanyTeam,
	updateCompanyProfile,
} from '../controllers/company.controller';
import { requireAdmin } from '../middleware/requireAdmin.middleware';

export const companyRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

companyRouter.use('*', verifyToken);

companyRouter.get('/profile', getCompanyProfile);
companyRouter.get('/team', getCompanyTeam);
companyRouter.put('/profile', requireAdmin, updateCompanyProfile);
companyRouter.patch('/employee/:id/deactivate', requireAdmin, deactivateEmployee);

export default companyRouter;
