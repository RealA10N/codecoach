import { fail, redirect } from '@sveltejs/kit';
import { message, setError, superValidate } from 'sveltekit-superforms/server';
import { registerNewUser } from '$lib/services/db.server';
import { setLoggedInUser } from '$lib/services/tokens.server';
import { registrationDetailsSchema } from '$src/lib/models/login';

export const load = async () => {
	const form = await superValidate(registrationDetailsSchema);
	return { form };
};

export const actions = {
	default: async ({ locals, request, cookies }) => {
		const form = await superValidate(request, registrationDetailsSchema);
		if (!form.valid) return fail(400, { form });

		try {
			const userConfig = await registerNewUser(locals.db, form.data);
			setLoggedInUser(userConfig, cookies);
		} catch (error) {
			if (error instanceof Error) return setError(form, error.message);
			return setError(form, 'Unknown Error');
		}

		throw redirect(303, '/');
	}
};
