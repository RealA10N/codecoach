import { z } from 'zod';

const emailFieldSchema = z.string().email({ message: 'Invalid Email address' });
const passwordFieldSchema = z.string().min(6, 'Password too short');
const nameFieldSchema = z
	.string()
	.min(3, { message: 'Name too short' })
	.max(24, { message: 'Name too long' })
	.regex(new RegExp('^[a-zA-Z\\s]+$'), {
		message: 'Name should consist of English letters and spaces only'
	})
	.trim();

export const loginDetailsScheme = z.object({
	email: emailFieldSchema,
	password: passwordFieldSchema
});

export type loginDetails = z.infer<typeof loginDetailsScheme>;

export const registrationDetailsSchema = z
	.object({
		name: nameFieldSchema,
		email: emailFieldSchema,
		password: passwordFieldSchema,
		confirm: z.string()
	})
	.refine((data) => data.password == data.confirm, {
		message: "Passwords don't match",
		path: ['confirm']
	});

export type registrationDetails = z.infer<typeof registrationDetailsSchema>;
