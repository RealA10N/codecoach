import { getSolutions } from '$src/lib/services/db.server';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => ({
    loggedInUser: locals.loggedInUser,
    solutions: getSolutions(locals.db, locals.loggedInUser?.id ?? null)
})) satisfies PageServerLoad;