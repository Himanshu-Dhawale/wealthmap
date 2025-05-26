import { Context } from 'hono';
import { getPrismaClient } from '../utils/prisma';
import { mockProperties } from '../mock/properties.mock';

export async function bookmarkProperty(c: Context) {
	const { userId } = c.get('jwtPayload');
	const propertyId = c.req.param('id');
	const prisma = getPrismaClient(c.env.DATABASE_URL);

	const exists = mockProperties.some((p) => p.id === propertyId);
	if (!exists) {
		return c.json({ message: 'Property not found in mock data' }, 404);
	}

	const already = await prisma.propertyBookmark.findFirst({
		where: { userId, propertyId },
	});
	if (already) {
		return c.json({ message: 'Already bookmarked' }, 400);
	}

	await prisma.propertyBookmark.create({
		data: { userId, propertyId },
	});

	return c.json({ message: 'Bookmarked successfully' }, 201);
}

export async function removeBookmark(c: Context) {
	const { userId } = c.get('jwtPayload');
	const propertyId = c.req.param('id');
	const prisma = getPrismaClient(c.env.DATABASE_URL);

	await prisma.propertyBookmark.deleteMany({
		where: { userId, propertyId },
	});

	return c.json({ message: 'Bookmark removed' }, 200);
}

export async function getBookmarks(c: Context) {
	const { userId } = c.get('jwtPayload');
	const prisma = getPrismaClient(c.env.DATABASE_URL);

	const bookmarks = await prisma.propertyBookmark.findMany({
		where: { userId },
		orderBy: { createdAt: 'desc' },
	});

	const enriched = bookmarks.map((b) => {
		const property = mockProperties.find((p) => p.id === b.propertyId);
		return {
			id: b.id,
			propertyId: b.propertyId,
			bookmarkedAt: b.createdAt,
			property: property ?? { id: b.propertyId, missing: true },
		};
	});

	return c.json({ bookmarks: enriched }, 200);
}
