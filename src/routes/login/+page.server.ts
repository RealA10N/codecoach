import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import isemail from 'isemail';
import { tryToLogin } from '$src/lib/services/db.server';
import { setLoggedInUser } from '$src/lib/services/tokens.server';

export const actions = {
	default: async ({ cookies, request, locals }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString() ?? '';
		const password = data.get('password')?.toString() ?? '';

		// validate email
		if (!email) return fail(400, { message: 'Email not provided' });
		if (!isemail.validate(email, { errorLevel: false }))
			return fail(400, { message: 'Invalid email address' });

		// validate password
		if (!password) return fail(400, { message: 'Password not provided' });

		const user = await tryToLogin(locals.db, email, password);
		if (!user) return fail(400, { message: 'Incorrect email or password' });

		setLoggedInUser(user, cookies);
		throw redirect(303, '/');
	}
} satisfies Actions;
