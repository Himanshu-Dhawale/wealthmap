import { z } from 'zod';

const passwordSchema = z
	.string()
	.min(12, { message: 'Password must be at least 12 characters long' })
	.refine((value) => /[A-Z]/.test(value), {
		message: 'Password must contain at least one uppercase letter',
	})
	.refine((value) => /[a-z]/.test(value), {
		message: 'Password must contain at least one lowercase letter',
	})
	.refine((value) => /[0-9]/.test(value), {
		message: 'Password must contain at least one number',
	})
	.refine((value) => /[^A-Za-z0-9]/.test(value), {
		message: 'Password must contain at least one special character',
	});

export const RegisterSchema = z.object({
	name: z.string().min(2, 'Company name must be at least 2 characters'),
	email: z.string().email('Invalid email address'),
	password: passwordSchema,
	logo: z.string().min(1, 'Logo is required'),
	firstName: z.string().min(2, 'First name must be at least 4 characters'),
	lastName: z.string().min(2, 'Last name must be at least 2 characters'),
	size: z.string().min(1, 'Size is required'),
	location: z.string().min(1, 'Location is required'),
});

export const LoginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(1, 'Password is required'),
});
