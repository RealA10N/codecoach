import bcrypt from "bcrypt";
import type { CodeforcesHandle, CsesUserNumber, Email, PasswordHash, SolutionId, UserConfig, UserId, UserName, UserPassword } from "$lib/models/user";
import { Container, CosmosClient, Database } from "@azure/cosmos";
import { env } from "$env/dynamic/private";
import { createHash } from "node:crypto";

type UserConfigContainer = Container;
type UserPasswordContainer = Container;
type UserSolutionsContainer = Container;

export interface DatabaseContainers {
    configs: UserConfigContainer,
    passwords: UserPasswordContainer,
    solutions: UserSolutionsContainer,
}

const getContainer = (async (db: Database, name: string) => (await db.containers.createIfNotExists({id: name, partitionKey: '/id'})).container)

export async function initDatabase() : Promise<DatabaseContainers> {
    const client = new CosmosClient({endpoint: env.COSMOS_ENDPOINT, key: env.COSMOS_KEY});
    const db = (await client.databases.createIfNotExists({ id: 'users' })).database;
    return {
        configs: await getContainer(db, 'configs') satisfies UserConfigContainer,
        passwords: await getContainer(db, 'passwords') satisfies UserPasswordContainer,
        solutions: await getContainer(db, 'solutions') satisfies UserSolutionsContainer,
    } satisfies DatabaseContainers;
}

const hashPassword = async (password: string) => await bcrypt.hash(password, parseInt(env.SALTS)) as PasswordHash;
const emailToId = (email: Email) => createHash('sha256').update(email).digest('hex') as UserId;

async function getUserItem(container: Container, id: UserId) {
    const item = container.item(id, id);
    return (await item?.read())?.resource ?? null;
}

export const getUserConfig = async (db: DatabaseContainers, id: UserId) => await getUserItem(db.configs, id) as UserConfig | null;
const checkIfRegistered = async (db: DatabaseContainers, id: UserId) => Boolean(await getUserItem(db.configs, id));
const updateUserConfig = async (db: DatabaseContainers, config: UserConfig) => await db.configs.items?.create(config);
const updateUserPassword = async (db: DatabaseContainers, userPassword: UserPassword) => await db.passwords.items?.create(userPassword);

export async function registerNewUser(db: DatabaseContainers, name: UserName, email: Email, codeforces: CodeforcesHandle, cses: CsesUserNumber, password: string) {
    if (await checkIfRegistered(db, name)) throw Error('Email already registered');
    const userId = emailToId(email);
    const userConfig = {
        id: userId,
        name: name,
        email: email,
        codeforces: codeforces,
        cses: cses,
        isAdmin: false,
    } satisfies UserConfig;

    updateUserConfig(db, userConfig);
    updateUserPassword(db, {
        id: userId,
        passwordHash: await hashPassword(password),
    });

    return userConfig;
}

export async function tryToLogin(db: DatabaseContainers, email: Email, password: string) {
    const userId = emailToId(email);
    const userPassword = await getUserItem(db.passwords, userId) as UserPassword | null;
    const passwordHash = userPassword?.passwordHash ?? '';
    const result = await bcrypt.compare(password, passwordHash)
    return result? await getUserItem(db.configs, userId) as UserConfig : null;
}

export async function getSolutions(db: DatabaseContainers, id: UserId | null) : Promise<string[] | null> {
    if (!id) return null;
    return (await getUserItem(db.solutions, id))?.solutions ?? null;
}

export async function listAllUsers(db: DatabaseContainers) : Promise<UserConfig[]> {
    const { resources } = await db.configs.items.readAll<UserConfig>().fetchAll();
    return resources ?? [];
}