import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import isemail from 'isemail';
import { registerNewUser } from '$src/lib/services/db.server';
import { setLoggedInUser } from '$src/lib/services/tokens.server';

export const actions = {
	default: async ({ cookies, request, locals }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString() ?? '';
		const password = data.get('password')?.toString() ?? '';
		const name = data.get('name')?.toString() ?? '';
		const cses = parseInt(data.get('cses')?.toString() ?? '');
		const codeforces = data.get('codeforces')?.toString() ?? '';

		// validate email
		if (!email) return fail(400, { message: 'Email not provided' });
		if (!isemail.validate(email, { errorLevel: false }))
			return fail(400, { message: 'Invalid email address' });

		// validate password
		if (!password) return fail(400, { message: 'Password not provided' });

		try {
			const userConfig = await registerNewUser(
				locals.db,
				name,
				email,
				codeforces,
				cses,
				password
			);
			setLoggedInUser(userConfig, cookies);
		} catch (error) {
			let message = 'Unknown Error';
			if (error instanceof Error) message = error.message;
			return fail(400, { message: message });
		}
		throw redirect(303, '/');
	}
} satisfies Actions;
