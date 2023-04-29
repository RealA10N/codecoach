import { getUserConfig, listAllUsers } from '$lib/services/db.server';
import { adminLoginAsUser } from '$src/lib/services/tokens.server';
import { redirect } from '@sveltejs/kit';
import type { PageServerData, PageServerLoad } from './$types';

export const load = (async ({ locals, url, cookies }) => {
    const uidOfUserToBeLoggedAs = url.searchParams.get('adminLogin');

    if (uidOfUserToBeLoggedAs && locals.loggedInUser?.isAdmin) {
        const user = await getUserConfig(locals.db, uidOfUserToBeLoggedAs);
        if (user) {
            adminLoginAsUser(user, cookies);
            throw redirect(302, '/');
        }
    }

    return {
        loggedInUser: locals.loggedInUser,
        users: listAllUsers(locals.db)
    } satisfies PageServerData;
}) satisfies PageServerLoad;