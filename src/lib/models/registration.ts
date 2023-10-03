import { z } from 'zod';

export const registrationDetailsSchema = z
	.object({
		name: z
			.string()
			.min(3, { message: 'Name too short' })
			.max(24, { message: 'Name too long' })
			.regex(new RegExp('^[a-zA-Z\\s]+$'), {
				message: 'Name should consist of English letters and spaces only'
			})
			.trim(),
		email: z.string().email({ message: 'Invalid Email address' }),
		password: z.string().min(6, 'Password too short'),
		confirm: z.string()
	})
	.refine((data) => data.password == data.confirm, {
		message: "Passwords don't match",
		path: ['confirm']
	});

export type registrationDetails = z.infer<typeof registrationDetailsSchema>;
