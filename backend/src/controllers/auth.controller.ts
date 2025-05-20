import { Context } from 'hono';
import { Jwt } from 'hono/utils/jwt';
import { hashPassword } from '../utils/auth.utils';
import { getPrismaClient } from '../utils/prisma';
import { LoginSchema, RegisterSchema } from '../schema/auth.schema';
import { uploadToCloudinaryUnsigned } from '../utils/cloudinary';
export async function registerCompany(c: Context) {
	try {
		const validation = RegisterSchema.safeParse(await c.req.json());
		if (!validation.success) {
			return c.json(
				{
					message: 'Validation failed',
					errors: validation.error.flatten(),
				},
				400,
			);
		}

		const { name, email, password, logo, firstName, lastName, size, location } = validation.data;
		const prisma = getPrismaClient(c.env.DATABASE_URL);

		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return c.json({ message: 'Email already in use' }, 409);
		}

		const base64SizeInBytes = (base64: string): number => {
			const len = base64.length;
			const padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
			return (len * 3) / 4 - padding;
		};

		let logoUrl: string | null = null;
		if (logo) {
			const maxSizeInBytes = 512 * 1024;

			if (base64SizeInBytes(logo) > maxSizeInBytes) {
				return c.json({ message: 'Logo must be less than 512KB' }, 400);
			}

			try {
				const uploadResult = await uploadToCloudinaryUnsigned(logo, c);
				logoUrl = uploadResult.secure_url;
			} catch (uploadError) {
				console.error('Logo upload failed:', uploadError);
				return c.json({ message: 'Failed to upload company logo' }, 500);
			}
		}

		const company = await prisma.company.create({
			data: {
				name,
				logoUrl,
				size,
				location,
			},
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

		const token = await Jwt.sign(
			{ userId: user.id, role: user.role, companyId: user.companyId },
			c.env.JWT_SECRET,
		);

		return c.json(
			{
				token,
				user: {
					id: user.id,
					email: user.email,
					role: user.role,
					companyId: user.companyId,
					firstName: user.firstName,
					lastName: user.lastName,
				},
				company: {
					id: company.id,
					name: company.name,
					logoUrl: company.logoUrl,
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

		const token = await Jwt.sign(
			{ userId: user.id, role: user.role, companyId: user.companyId },
			c.env.JWT_SECRET,
		);

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
