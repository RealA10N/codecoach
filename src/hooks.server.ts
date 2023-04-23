import type { Handle } from '@sveltejs/kit';
import { handleTokenVerification } from '$lib/services/tokens.server';

export const handle = (async ({ event, resolve }) => {
    event.locals.user = handleTokenVerification(event.cookies);
    return await resolve(event);

}) satisfies Handle;