import { Context } from 'hono';
import { getPrismaClient } from '../utils/prisma';
import { ReportSchema } from '../schema/report.schema';
import { ReportStatus } from '@prisma/client';

export async function createReport(c: Context) {
	const prisma = getPrismaClient(c.env.DATABASE_URL);
	const { userId, companyId } = c.get('jwtPayload');
	const body = await c.req.json();
	const parsed = ReportSchema.safeParse(body);

	if (!parsed.success) {
		return c.json({ message: 'Validation failed', errors: parsed.error.flatten() }, 400);
	}

	const data = parsed.data;
	const report = await prisma.report.create({
		data: {
			...data,
			lastContactDate: data.lastContactDate ? new Date(data.lastContactDate) : null,
			createdById: userId,
			companyId,
		},
	});

	return c.json({ message: 'Report submitted', report }, 201);
}

export async function getReports(c: Context) {
	const prisma = getPrismaClient(c.env.DATABASE_URL);
	const { userId, role, companyId } = c.get('jwtPayload');

	const reports = await prisma.report.findMany({
		where: {
			companyId,
			...(role === 'EMPLOYEE' ? { createdById: userId } : {}),
		},
		orderBy: { createdAt: 'desc' },
	});

	return c.json({ reports });
}

export async function markReportReviewed(c: Context) {
	const prisma = getPrismaClient(c.env.DATABASE_URL);
	const { role, companyId } = c.get('jwtPayload');
	const reportId = c.req.param('id');

	if (role !== 'ADMIN') {
		return c.json({ message: 'Only admins can review reports' }, 403);
	}

	const report = await prisma.report.findFirst({ where: { id: reportId, companyId } });
	if (!report) return c.json({ message: 'Report not found' }, 404);

	const updatedReport = await prisma.report.update({
		where: { id: reportId },
		data: { status: ReportStatus.REVIEWED },
	});
	return c.json({ message: 'Report marked as reviewed', report: updatedReport });
}
