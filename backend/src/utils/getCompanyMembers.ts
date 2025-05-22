import { PrismaClient } from '@prisma/client';

export async function getCompanyMembers(prisma: PrismaClient, companyId: string) {
	const [users, invitations] = await Promise.all([
		prisma.user.findMany({
			where: { companyId },
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				role: true,
				isActive: true,
				createdAt: true,
				status: true,
			},
		}),
		prisma.invitation.findMany({
			where: { companyId },
			select: {
				email: true,
				status: true,
				createdAt: true,
				acceptedAt: true,
			},
		}),
	]);

	const userEmails = new Set(users.map((u) => u.email.toLowerCase()));

	const members = [
		...users.map((user) => ({
			id: user.id,
			email: user.email,
			name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
			role: user.role,
			status: user.status,
			joinedAt: user.createdAt,
			isActive: user.isActive,
		})),
		...invitations
			.filter((inv) => !userEmails.has(inv.email.toLowerCase()))
			.map((invite) => ({
				id: null,
				email: invite.email,
				name: '',
				role: 'EMPLOYEE',
				status: invite.status,
				joinedAt: invite.acceptedAt ?? invite.createdAt,
				isActive: false,
			})),
	];

	return members;
}
