import { MiddlewareHandler } from 'hono';

export const onlyEmployee: MiddlewareHandler = async (c, next) => {
	const { role } = c.get('jwtPayload') as { role: string };

	if (role !== 'EMPLOYEE') {
		return c.json({ message: 'MFA setup is only required for employees.' }, 403);
	}

	await next();
};
