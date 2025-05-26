import { Hono } from 'hono';
import { verifyToken } from '../middleware/auth.middleware';
import { createReport, getReports, markReportReviewed } from '../controllers/report.controller';

export const reportRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

reportRouter.use('*', verifyToken);
reportRouter.post('/', createReport);
reportRouter.get('/', getReports);
reportRouter.patch('/:id/review', markReportReviewed);

export default reportRouter;
