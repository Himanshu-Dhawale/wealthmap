import { Hono } from 'hono';
import { acceptInvitation, inviteEmployee } from '../controllers/invitation.controller';
import { verifyToken } from '../middleware/auth.middleware';

export const invitationRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

invitationRouter.post('/invite', verifyToken, inviteEmployee);
invitationRouter.post('/accept', acceptInvitation);

export default invitationRouter;
