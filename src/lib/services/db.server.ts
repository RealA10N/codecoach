import bcrypt from "bcrypt";
import type { InternalUser, User } from "$lib/models/user";
import { Container, CosmosClient } from "@azure/cosmos";
import { env } from "$env/dynamic/private";

export async function initUsersClient() {
    const client = new CosmosClient({endpoint: env.COSMOS_ENDPOINT, key: env.COSMOS_KEY});
    const { database } = await client.databases.createIfNotExists({ id: 'codecoach' });
    const { container } = await database.containers.createIfNotExists({
        id: 'users',
        partitionKey: '/id'
    });
    return container;
}

export async function getDatabaseUser(email: string, users: Container) : Promise<InternalUser | null> {
    const item = users.item(email, email);
    return (await item?.read<InternalUser>())?.resource ?? null;
}

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, parseInt(env.SALTS));
}

export async function checkIfEmailRegistered(email: string, users: Container) {
    return (await getDatabaseUser(email, users)) !== null;
}

export async function registerNewUser(user: InternalUser, users: Container) {
    users.items?.create(user);
}

export async function tryToLogin(email: string, password: string, users: Container) : Promise<User | null> {
    const internalUser = await getDatabaseUser(email, users);
    return bcrypt.compare(password, internalUser?.passwordHash ?? '').then(
        (result) => {
            if (result && internalUser) {
                const {passwordHash, id, ...user} = internalUser;
                return user as User;
            } 
            return null;
        }
    );
}