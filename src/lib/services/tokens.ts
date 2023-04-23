import jwt from "jsonwebtoken";
import { env } from "$env/dynamic/private";
import type { User } from "$lib/models/user";
import type { Cookies } from "@sveltejs/kit";
const TOKEN = 'token';
const EXPIRES_IN_SECONDS = 60 * 60 * 24 * 14;

export function signUser(user: User) : string {
    return jwt.sign(user, env.JWT_SECRET, {expiresIn: 1000 * EXPIRES_IN_SECONDS})
}

export const deleteToken = (cookies: Cookies) => cookies.delete(TOKEN);

export function setLoggedInUser(user: User, cookies: Cookies) {
    cookies.set(TOKEN, signUser(user), {
        maxAge: EXPIRES_IN_SECONDS,
        sameSite: 'strict',
    })
}

export function handleTokenVerification(cookies: Cookies) : User | null {
    const token = cookies.get('token') ?? '';
    
    try {
        const user = jwt.verify(token, env.JWT_SECRET) as User;
        return user;
    } catch (e) {
        deleteToken(cookies);
        return null;
    }
    
    deleteToken(cookies);
    return null;
}