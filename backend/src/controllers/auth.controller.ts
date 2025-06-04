import { Context } from 'hono';
import { Jwt } from 'hono/utils/jwt';
import { hashPassword } from '../utils/auth.utils';
import { getPrismaClient } from '../utils/prisma';
import {
	EmailSchema,
	LoginSchema,
	RegisterSchema,
	ResetPasswordSchema,
} from '../schema/auth.schema';
import { uploadToCloudinaryUnsigned } from '../utils/cloudinary';
import { generateMfaSecret, verifyMfaToken } from '../utils/mfa';
import { generateToken } from '../utils/token';
import { sendEmail } from '../utils/email';
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
				isActive: true,
				status: true,
			},
		});

		if (!user?.isActive || user.status === 'REVOKED') {
			return c.json({ message: 'Account is deactivated' }, 401);
		}

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

export async function setupMfa(c: Context) {
	const { userId } = c.get('jwtPayload');
	const prisma = getPrismaClient(c.env.DATABASE_URL);

	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user) return c.json({ message: 'User not found' }, 404);

	const { secret } = generateMfaSecret(user.email);

	await prisma.user.update({
		where: { id: userId },
		data: { mfaSecret: secret },
	});

	return c.json({
		message: 'Use this secret key in your authenticator app',
		secret,
		issuer: 'WealthMap',
		account: user.email,
	});
}

export async function verifyMfaSetup(c: Context) {
	const { token } = await c.req.json();
	const { userId } = c.get('jwtPayload');
	const prisma = getPrismaClient(c.env.DATABASE_URL);

	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user?.mfaSecret) return c.json({ message: 'MFA not initialized' }, 400);

	const isValid = verifyMfaToken(user.mfaSecret, token);
	if (!isValid) return c.json({ message: 'Invalid token' }, 401);

	await prisma.user.update({
		where: { id: userId },
		data: { mfaEnabled: true },
	});

	return c.json({ message: 'MFA enabled successfully' });
}

export async function getMfaStatus(c: Context) {
	const { userId } = c.get('jwtPayload');
	const prisma = getPrismaClient(c.env.DATABASE_URL);

	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { mfaEnabled: true },
	});

	if (!user) return c.json({ message: 'User not found' }, 404);

	return c.json({ mfaEnabled: user.mfaEnabled });
}

export async function requestEmailVerification(c: Context) {
	const prisma = getPrismaClient(c.env.DATABASE_URL);
	const body = await c.req.json();
	const parsed = EmailSchema.safeParse(body);
	if (!parsed.success) return c.json({ message: 'Invalid email' }, 400);

	const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
	if (!user) return c.json({ message: 'User not found' }, 404);
	const token = generateToken();
	await prisma.emailVerificationToken.create({
		data: {
			userId: user.id,
			token,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60),
		},
	});

	await sendEmail(
		user.email,
		'Verify Your Email',
		`Click <a href="${c.env.FRONTEND_URL}/verify-email?token=${token}">here</a> to verify your email.`,
	);

	return c.json({ message: 'Verification email sent' });
}

export async function verifyEmail(c: Context) {
	const token = c.req.query('token');
	const prisma = getPrismaClient(c.env.DATABASE_URL);

	const record = await prisma.emailVerificationToken.findUnique({ where: { token } });
	if (!record || record.expiresAt < new Date()) {
		return c.json({ message: 'Token expired or invalid' }, 400);
	}

	await prisma.user.update({ where: { id: record.userId }, data: { emailVerified: true } });
	await prisma.emailVerificationToken.delete({ where: { token } });

	return c.json({ message: 'Email verified successfully' });
}

export async function forgotPassword(c: Context) {
	const prisma = getPrismaClient(c.env.DATABASE_URL);
	const body = await c.req.json();
	const parsed = EmailSchema.safeParse(body);
	if (!parsed.success) return c.json({ message: 'Invalid email' }, 400);

	const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
	if (!user) return c.json({ message: 'User not found' }, 404);

	const token = generateToken();
	await prisma.passwordResetToken.create({
		data: {
			userId: user.id,
			token,
			expiresAt: new Date(Date.now() + 1000 * 60 * 30),
		},
	});

	await sendEmail(
		user.email,
		'Password Reset',
		`Reset your password by clicking <a href="${c.env.FRONTEND_URL}/reset-password?token=${token}">here</a>.`,
	);

	return c.json({ message: 'Reset email sent' });
}

export async function resetPassword(c: Context) {
	const prisma = getPrismaClient(c.env.DATABASE_URL);
	const body = await c.req.json();
	const parsed = ResetPasswordSchema.safeParse(body);

	if (!parsed.success) return c.json({ message: 'Invalid input' }, 400);

	const record = await prisma.passwordResetToken.findUnique({
		where: { token: parsed.data.token },
	});
	if (!record || record.expiresAt < new Date()) {
		return c.json({ message: 'Token expired or invalid' }, 400);
	}

	await prisma.user.update({
		where: { id: record.userId },
		data: { passwordHash: await hashPassword(parsed.data.newPassword) },
	});

	await prisma.passwordResetToken.delete({ where: { token: parsed.data.token } });
	return c.json({ message: 'Password updated successfully' });
}
