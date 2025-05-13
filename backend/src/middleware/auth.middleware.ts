import { MiddlewareHandler } from 'hono';
import { Jwt } from 'hono/utils/jwt';

export const verifyToken: MiddlewareHandler = async (c, next) => {
	const authHeader = c.req.header('Authorization');
	if (!authHeader) return c.json({ message: 'Unauthorized' }, 401);

	const token = authHeader.replace('Bearer ', '');
	try {
		const payload = await Jwt.verify(token, c.env.JWT_SECRET);
		c.set('jwtPayload', payload);
		await next();
	} catch {
		return c.json({ message: 'Invalid token' }, 401);
	}
};
