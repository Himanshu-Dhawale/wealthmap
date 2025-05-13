import { z } from 'zod';

export const InviteEmployeeSchema = z.object({
	email: z.string().email(),
});

export const AcceptInvitationSchema = z.object({
	invitationId: z.string().uuid(),
	password: z.string().min(8),
	firstName: z.string().min(1),
	lastName: z.string().min(1),
});
