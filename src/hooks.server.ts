import type { Handle } from '@sveltejs/kit';
import { handleTokenVerification } from '$lib/services/tokens.server';
import { initUsersClient } from '$lib/services/db.server';

export const handle = (async ({ event, resolve }) => {
    event.locals.users = await initUsersClient();
    event.locals.user = handleTokenVerification(event.cookies);
    return await resolve(event);

}) satisfies Handle;