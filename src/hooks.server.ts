import type { Handle } from '@sveltejs/kit';
import { handleTokenVerification } from '$lib/services/tokens.server';
import { initDatabase } from '$lib/services/db.server';

export const handle = (async ({ event, resolve }) => {
    event.locals.db = await initDatabase();
    event.locals.user = handleTokenVerification(event.cookies);
    return await resolve(event);

}) satisfies Handle;