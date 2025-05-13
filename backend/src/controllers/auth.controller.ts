import { Context } from 'hono';
import { Jwt } from 'hono/utils/jwt';
import { hashPassword } from '../utils/auth.utils';
import { getPrismaClient } from '../utils/prisma';
import { LoginSchema, RegisterSchema } from '../schema/auth.schema';
import { uploadToCloudinary } from '../utils/cloudinary';

export async function registerCompany(c: Context) {
	try {
		const validation = RegisterSchema.safeParse(await c.req.json());
		if (!validation.success) {
			return c.json({ message: 'Validation failed', errors: validation.error.flatten() }, 400);
		}

		const { name, email, password, logo, firstName, lastName, size, location } = validation.data;
		const prisma = getPrismaClient(c.env.DATABASE_URL);

		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return c.json({ message: 'Email already in use' }, 409);
		}

		let logoUrl: string | undefined;
		if (logo) {
			const uploadResult = await uploadToCloudinary(logo);
			logoUrl = uploadResult.secure_url;
		}

		const company = await prisma.company.create({
			data: { name, logoUrl, size, location },
		});

		const user = await prisma.user.create({
			data: {
				email,
				passwordHash: await hashPassword(password),
				role: 'ADMIN',
				companyId: company.id,
				firstName,
				lastName,
			},
		});

		const token = await Jwt.sign({ userId: user.id, role: user.role }, c.env.JWT_SECRET);

		return c.json(
			{
				token,
				user: {
					id: user.id,
					email: user.email,
					role: user.role,
					companyId: user.companyId,
				},
			},
			201,
		);
	} catch (error) {
		console.error('Registration Error:', error);
		return c.json({ message: 'Registration failed due to server error' }, 500);
	}
}

export async function login(c: Context) {
	try {
		const validation = LoginSchema.safeParse(await c.req.json());
		if (!validation.success) {
			return c.json(
				{
					message: 'Validation failed',
					errors: validation.error.flatten(),
				},
				400,
			);
		}

		const { email, password } = validation.data;
		const prisma = getPrismaClient(c.env.DATABASE_URL);
		const user = await prisma.user.findUnique({
			where: { email },
			select: {
				id: true,
				email: true,
				passwordHash: true,
				role: true,
				companyId: true,
			},
		});

		if (!user || (await hashPassword(password)) !== user.passwordHash) {
			return c.json({ message: 'Invalid credentials' }, 401);
		}

		const token = await Jwt.sign({ userId: user.id, role: user.role }, c.env.JWT_SECRET);

		return c.json({
			token,
			user: {
				id: user.id,
				email: user.email,
				role: user.role,
				companyId: user.companyId,
			},
		});
	} catch (error) {
		console.error('Login error:', error);
		return c.json(
			{
				message: 'Login failed due to server error',
			},
			500,
		);
	}
}
