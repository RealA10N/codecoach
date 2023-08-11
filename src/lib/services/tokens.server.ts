import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { UserModel, type User } from '$lib/models/user';
import type { Cookies } from '@sveltejs/kit';
const TOKEN = 'token';
const TWO_WEEKS = 60 * 60 * 24 * 14;

export function signUser(user: User, expire_seconds: number): string {
  return jwt.sign(user, env.JWT_SECRET, { expiresIn: 1000 * expire_seconds });
}

export const deleteToken = (cookies: Cookies) => cookies.delete(TOKEN);

export function setLoggedInUser(user: User, cookies: Cookies) {
  cookies.set(TOKEN, signUser(user, TWO_WEEKS), {
    maxAge: TWO_WEEKS,
    sameSite: 'strict'
  });
}

export function handleTokenVerification(cookies: Cookies): User | null {
  const token = cookies.get('token') ?? '';

  try {
    return UserModel.parse(jwt.verify(token, env.JWT_SECRET))
  } catch (e) {
    // parsing error or token expired error
    deleteToken(cookies);
    return null;
  }
}
