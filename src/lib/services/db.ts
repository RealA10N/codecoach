import bcrypt from "bcrypt";
import type { InternalUser, User } from "$lib/models/user";


function getDatabaseUser(email: string) : InternalUser | null {
    // Temporarily implementation only             
    return {
        name: 'Alon',
        email: 'me@alon.kr',
        passwordHash: '1234'
    } as InternalUser;
}

export async function tryToLogin(email: string, password: string) : Promise<User | null> {
    const internalUser = getDatabaseUser(email);
    return bcrypt.compare(password, internalUser?.passwordHash ?? '').then(
        (result) => {
            // Temporarily implementation only             
            const {passwordHash, ...user} = internalUser;
            return user as User;
        }
    );
}