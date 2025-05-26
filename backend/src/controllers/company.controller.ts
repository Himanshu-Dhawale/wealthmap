import { Context } from 'hono';
import { getPrismaClient } from '../utils/prisma';
import { UpdateCompanyProfileSchema } from '../schema/company.schema';
import { getCompanyMembers } from '../utils/getCompanyMembers';
import { InviteStatus, UserStatus } from '@prisma/client';

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

	const members = await getCompanyMembers(prisma as any, companyId);
	return c.json({ members });
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
		const { companyId, userId: requestingUserId } = c.get('jwtPayload');
		const prisma = getPrismaClient(c.env.DATABASE_URL);

		const targetUserId = c.req.param('id');

		if (targetUserId === requestingUserId) {
			return c.json({ message: "You can't deactivate your own account." }, 403);
		}

		const user = await prisma.user.findFirst({
			where: { id: targetUserId, companyId },
		});

		if (!user) {
			return c.json({ message: 'User not found' }, 404);
		}

		await prisma.user.update({
			where: { id: targetUserId },
			data: {
				isActive: false,
				status: UserStatus.REVOKED,
				passwordHash: '',
				mfaSecret: null,
			},
		});

		await prisma.invitation.updateMany({
			where: {
				email: user.email,
				companyId,
				status: InviteStatus.PENDING,
			},
			data: { status: InviteStatus.REVOKED },
		});
		const members = await getCompanyMembers(prisma as any, companyId);

		return c.json({ message: 'User deactivated', members }, 200);
	} catch (error) {
		console.error('Deactivate employee error:', error);
		return c.json({ message: 'Internal server error' }, 500);
	}
}
