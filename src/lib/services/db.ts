import bcrypt from "bcrypt";
import type { InternalUser, User } from "$lib/models/user";
import { CosmosClient } from "@azure/cosmos";
import { COSMOS_ENDPOINT, COSMOS_KEY, SALTS } from "$env/static/private";


const client = new CosmosClient({endpoint: COSMOS_ENDPOINT, key: COSMOS_KEY});
const { database } = await client.databases.createIfNotExists({ id: 'codecoach' });
const { container } = await database.containers.createIfNotExists({
    id: 'users',
    partitionKey: '/id'
});

export async function getDatabaseUser(email: string) : Promise<InternalUser | null> {
    const item = container.item(email, email);
    const { resource } = await item.read<InternalUser>();
    return resource ?? null;
}

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, parseInt(SALTS));
}

export async function checkIfEmailRegistered(email: string) {
    return (await getDatabaseUser(email)) !== null;
}

export async function registerNewUser(user: InternalUser) {
    const { resource } = await container.items.create(user);
}

export async function tryToLogin(email: string, password: string) : Promise<User | null> {
    const internalUser = await getDatabaseUser(email);
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