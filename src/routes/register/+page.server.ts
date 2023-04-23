import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import isemail from 'isemail';
import { checkIfEmailRegistered, hashPassword, registerNewUser } from '$lib/services/db';
import { setLoggedInUser } from '$lib/services/tokens';
import type { InternalUser } from '$lib/models/user';


export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email')?.toString() ?? '';
        const password = data.get('password')?.toString() ?? '';
        const name = data.get('name')?.toString() ?? '';
        const cses = parseInt(data.get('cses')?.toString() ?? '');
        const codeforces = data.get('codeforces')?.toString() ?? '';

        // validate email
        if (!email) return fail(400, {error: "Email not provided"})
        if (!isemail.validate(email, {errorLevel: false}))
        return fail(400, {error: "Invalid email address"});
        
        // validate password
        if (!password) return fail(400, {error: "Password not provided"})
        
        if(await checkIfEmailRegistered(email))
            return fail(400, {error: "Email already registered"})
        
        const user = {
            name,
            email,
            id: email,
            passwordHash: await hashPassword(password),
            cses,
            codeforces,
        } satisfies InternalUser;
        
        await registerNewUser(user);
        setLoggedInUser(user, cookies);
        throw redirect(303, '/');
    }
} satisfies Actions;