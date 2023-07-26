import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import type { UserConfig, UserUId } from '$lib/models/user';
import type { Cookies } from '@sveltejs/kit';
const TOKEN = 'token';
const TWO_WEEKS = 60 * 60 * 24 * 14;
const ONE_HOUR = 60 * 60;

export function signUser(user: UserConfig, expire_seconds: number): string {
	return jwt.sign(user, env.JWT_SECRET, { expiresIn: 1000 * expire_seconds });
}

export const deleteToken = (cookies: Cookies) => cookies.delete(TOKEN);

export function setLoggedInUser(user: UserConfig, cookies: Cookies) {
	cookies.set(TOKEN, signUser(user, TWO_WEEKS), {
		maxAge: TWO_WEEKS,
		sameSite: 'strict'
	});
}

export function adminLoginAsUser(user: UserConfig, cookies: Cookies) {
	cookies.set(TOKEN, signUser(user, ONE_HOUR), {
		maxAge: ONE_HOUR,
		sameSite: 'strict'
	});
}

export function handleTokenVerification(cookies: Cookies): UserConfig | null {
	const token = cookies.get('token') ?? '';

	try {
		const user = jwt.verify(token, env.JWT_SECRET) as UserConfig;
		return user;
	} catch (e) {
		deleteToken(cookies);
		return null;
	}

	deleteToken(cookies);
	return null;
}
