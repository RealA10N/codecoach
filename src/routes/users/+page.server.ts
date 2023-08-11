import { listAllUsers } from '$lib/services/db.server';
import type { PageServerData, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	return {
		loggedInUser: locals.loggedInUser,
		users: listAllUsers(locals.db)
	} satisfies PageServerData;
}
