import { getSolutions } from '$src/lib/services/db.server';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => ({
    user: locals.user,
    solutions: getSolutions(locals.db, locals.user?.id ?? null)
})) satisfies PageServerLoad;