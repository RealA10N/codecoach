import { deleteToken } from '$src/lib/services/tokens.server';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (({ cookies }) => {
	deleteToken(cookies);
	throw redirect(302, '/');
}) satisfies PageServerLoad;
