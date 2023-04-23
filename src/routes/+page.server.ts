import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => ({
    user: locals.user
})) satisfies PageServerLoad;