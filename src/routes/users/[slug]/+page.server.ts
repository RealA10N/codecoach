import { getUserIntegrations, getUser } from '$lib/services/db.server';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = await getUser(locals.db, params.slug);
	if (!user) throw redirect(302, '/users');
	const integrations = user ? await getUserIntegrations(locals.db, user) : null;
	const isLoggedUser = locals.loggedInUser?.id == user?.id;
	return { user, integrations, isLoggedUser };
};
