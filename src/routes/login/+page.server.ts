import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import { tryToLogin } from '$src/lib/services/db.server';
import { setLoggedInUser } from '$src/lib/services/tokens.server';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { loginDetailsScheme } from '$src/lib/models/login';

export const load = async () => {
	const form = await superValidate(loginDetailsScheme);
	return { form };
};

export const actions = {
	default: async ({ cookies, request, locals }) => {
		const form = await superValidate(request, loginDetailsScheme);
		if (!form.valid) return fail(400, { form });

		const user = await tryToLogin(locals.db, form.data);
		if (!user) return setError(form, 'Incorrect email or password');

		setLoggedInUser(user, cookies);
		throw redirect(303, '/');
	}
} satisfies Actions;
