import { Context } from 'hono';
import { AcceptInvitationSchema, InviteEmployeeSchema } from '../schema/invitation.schema';
import { getPrismaClient } from '../utils/prisma';
import { hashPassword } from '../utils/auth.utils';
import { sendInvitationEmail } from '../utils/email';

export async function inviteEmployee(c: Context) {
	try {
		const body = await c.req.json();
		const validation = InviteEmployeeSchema.safeParse(body);
		if (!validation.success) {
			return c.json({ message: 'Invalid email', errors: validation.error.flatten() }, 400);
		}

		const { email } = validation.data;
		const prisma = getPrismaClient(c.env.DATABASE_URL);

		const tokenPayload = (await c.get('jwtPayload')) as {
			userId: string;
			role: string;
			companyId: string;
		};
		const companyId = tokenPayload.companyId;

		const existingInvite = await prisma.invitation.findFirst({
			where: { email, companyId, status: 'PENDING' },
		});

		if (existingInvite) {
			return c.json({ message: 'User already invited' }, 400);
		}

		const invitation = await prisma.invitation.create({
			data: { email, companyId },
		});

		const inviteLink = `${c.env.FRONTEND_URL}/onboarding/accept?token=${invitation.id}`;

		await sendInvitationEmail(email, inviteLink);

		return c.json({ message: 'Invitation sent', invitationId: invitation.id });
	} catch (err) {
		console.error('Invite error:', err);
		return c.json({ message: 'Internal error' }, 500);
	}
}

export async function acceptInvitation(c: Context) {
	const body = await c.req.json();
	const validation = AcceptInvitationSchema.safeParse(body);

	if (!validation.success) {
		return c.json({ message: 'Invalid data', errors: validation.error.flatten() }, 400);
	}

	const { invitationId, password, firstName, lastName } = validation.data;
	const prisma = getPrismaClient(c.env.DATABASE_URL);

	const invitation = await prisma.invitation.findUnique({ where: { id: invitationId } });

	if (!invitation || invitation.status !== 'PENDING') {
		return c.json({ message: 'Invalid or expired invitation' }, 400);
	}

	const existingUser = await prisma.user.findUnique({ where: { email: invitation.email } });
	if (existingUser) {
		return c.json({ message: 'User already registered' }, 409);
	}

	await prisma.$transaction([
		prisma.invitation.update({
			where: { id: invitationId },
			data: { status: 'ACCEPTED', acceptedAt: new Date() },
		}),
		prisma.user.create({
			data: {
				email: invitation.email,
				passwordHash: await hashPassword(password),
				firstName,
				lastName,
				role: 'EMPLOYEE',
				companyId: invitation.companyId,
			},
		}),
	]);

	return c.json({ message: 'Account created successfully' }, 201);
}
