import { z } from 'zod';

const passwordSchema = z
	.string()
	.min(8, 'Password must be at least 8 characters')
	.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
	.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
	.regex(/\d/, 'Password must contain at least one number')
	.regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

const emailSchema = z.string().email('Invalid email address');

export const RegisterSchema = z.object({
	name: z.string().min(2, 'Company name must be at least 2 characters'),
	email: emailSchema,
	password: passwordSchema,
	logo: z.string().min(1, 'Logo is required'),
	firstName: z.string().min(2, 'First name must be at least 4 characters'),
	lastName: z.string().min(2, 'Last name must be at least 2 characters'),
	size: z.string().min(1, 'Size is required'),
	location: z.string().min(1, 'Location is required'),
});

export const LoginSchema = z.object({
	email: emailSchema,
	password: z.string().min(8, 'Password is required'),
});

export const EmailSchema = z.object({ email: z.string().email() });
export const ResetPasswordSchema = z.object({ token: z.string(), newPassword: z.string().min(8) });
