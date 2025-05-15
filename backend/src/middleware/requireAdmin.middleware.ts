import { MiddlewareHandler } from 'hono';

export const requireAdmin: MiddlewareHandler = async (c, next) => {
	const payload = c.get('jwtPayload') as { role: string };

	if (payload?.role !== 'ADMIN') {
		return c.json({ message: 'Access denied: Admins only' }, 403);
	}

	await next();
};
