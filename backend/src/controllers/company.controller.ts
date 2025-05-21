import { Context } from 'hono';
import { getPrismaClient } from '../utils/prisma';
import { UpdateCompanyProfileSchema } from '../schema/company.schema';

export async function getCompanyProfile(c: Context) {
	try {
		const { companyId } = c.get('jwtPayload');
		const prisma = getPrismaClient(c.env.DATABASE_URL);

		const company = await prisma.company.findUnique({
			where: { id: companyId },
			select: {
				id: true,
				name: true,
				logoUrl: true,
				size: true,
				location: true,
				preferences: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!company) {
			return c.json({ message: 'Company not found' }, 404);
		}

		return c.json({ company }, 200);
	} catch (error) {
		console.error('Error fetching company profile:', error);
		return c.json({ message: 'Internal server error' }, 500);
	}
}

export async function getCompanyTeam(c: Context) {
	const { companyId } = c.get('jwtPayload');
	const prisma = getPrismaClient(c.env.DATABASE_URL);

	const users = await prisma.user.findMany({
		where: { companyId },
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			role: true,
			isActive: true,
			createdAt: true,
		},
	});

	const invitations = await prisma.invitation.findMany({
		where: { companyId },
		select: {
			email: true,
			status: true,
			createdAt: true,
			acceptedAt: true,
		},
	});

	const userEmails = new Set(users.map((u) => u.email.toLowerCase()));

	const unmatchedInvites = invitations
		.filter((inv) => !userEmails.has(inv.email.toLowerCase()))
		.map((invite) => ({
			id: null,
			email: invite.email,
			name: '',
			role: 'EMPLOYEE',
			status: invite.status,
			joinedAt: invite.acceptedAt ?? invite.createdAt,
			isActive: false,
		}));

	const acceptedUsers = users.map((user) => ({
		id: user.id,
		email: user.email,
		name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
		role: user.role,
		status: 'ACCEPTED',
		joinedAt: user.createdAt,
		isActive: user.isActive,
	}));

	const team = [...acceptedUsers, ...unmatchedInvites];

	return c.json({ members: team }, 200);
}

export async function updateCompanyProfile(c: Context) {
	try {
		const body = await c.req.json();
		const { success, data, error: validationError } = UpdateCompanyProfileSchema.safeParse(body);
		if (!success) {
			return c.json({ message: 'Validation failed', errors: validationError.flatten() }, 400);
		}
		const { companyId } = c.get('jwtPayload');
		const prisma = getPrismaClient(c.env.DATABASE_URL);
		const company = await prisma.company.update({
			where: { id: companyId },
			data,
		});
		return c.json({ message: 'Company updated', company });
	} catch (error) {
		console.error('Update company error:', error);
		return c.json({ message: 'Internal server error' }, 500);
	}
}

export async function deactivateEmployee(c: Context) {
	try {
		const { companyId } = c.get('jwtPayload');
		const prisma = getPrismaClient(c.env.DATABASE_URL);

		const userId = c.req.param('id');
		const user = await prisma.user.findFirst({
			where: { id: userId, companyId },
		});

		if (!user) {
			return c.json({ message: 'User not found' }, 404);
		}

		const updated = await prisma.user.update({
			where: { id: userId },
			data: { isActive: false },
		});

		return c.json({ message: 'User deactivated', user: updated });
	} catch (error) {
		console.error('Deactivate employee error:', error);
		return c.json({ message: 'Internal server error' }, 500);
	}
}
