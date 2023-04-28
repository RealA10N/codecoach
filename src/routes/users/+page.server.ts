import { listAllUsers } from '$lib/services/db.server';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => ({
    users: listAllUsers(locals.db)
})) satisfies PageServerLoad;