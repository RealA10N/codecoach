import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import isemail from 'isemail';
import { tryToLogin } from '$lib/services/db';
import { setLoggedInUser } from '$lib/services/tokens';

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email')?.toString() ?? '';
        const password = data.get('password')?.toString() ?? '';

        // validate email
        if (!email) return fail(400, {error: "Email not provided"})
        if (!isemail.validate(email, {errorLevel: false}))
        return fail(400, {error: "Invalid email address"});
        
        // validate password
        if (!password) return fail(400, {error: "Password not provided"})
        
        const user = await tryToLogin(email, password);
        if (!user) return fail(400, {error: "Incorrect email or password"});
        
        setLoggedInUser(user, cookies);
        throw redirect(303, '/');
    }
} satisfies Actions;