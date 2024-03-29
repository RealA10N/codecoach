import { env } from '$env/dynamic/private';
import {
	type AnyIntegration,
	AnyIntegrationModel
} from '$lib/models/integration';
import {
	UserModel,
	type PasswordHash,
	type User,
	type UserPassword,
	UserPasswordModel
} from '$lib/models/user';
import { Container, CosmosClient, Database } from '@azure/cosmos';
import bcrypt from 'bcrypt';
import { SubmissionModel, type Submission } from '$lib/models/submission';
import { z } from 'zod';
import { emailToId } from '$lib/services/hash.server';
import type { loginDetails, registrationDetails } from '$lib/models/login';

type UserConfigContainer = Container;
type UserPasswordContainer = Container;
type UserSubmissionsContainer = Container;
type UserIntegrationsContainer = Container;

export interface DatabaseContainers {
	configs: UserConfigContainer;
	passwords: UserPasswordContainer;
	submissions: UserSubmissionsContainer;
	integrations: UserIntegrationsContainer;
}

const getContainer = async (db: Database, name: string) =>
	(await db.containers.createIfNotExists({ id: name, partitionKey: '/id' }))
		.container;

export async function initDatabase(): Promise<DatabaseContainers> {
	const client = new CosmosClient({
		endpoint: env.COSMOS_ENDPOINT,
		key: env.COSMOS_KEY
	});
	const db = (await client.databases.createIfNotExists({ id: 'prod' }))
		.database;
	return {
		configs: (await getContainer(db, 'configs')) satisfies UserConfigContainer,
		passwords: (await getContainer(
			db,
			'passwords'
		)) satisfies UserPasswordContainer,
		submissions: (await getContainer(
			db,
			'submissions'
		)) satisfies UserSubmissionsContainer,
		integrations: (await getContainer(
			db,
			'integrations'
		)) satisfies UserIntegrationsContainer
	} satisfies DatabaseContainers;
}

const hashPassword = async (password: string) =>
	(await bcrypt.hash(password, parseInt(env.SALTS))) as PasswordHash;

export async function getUser(
	db: DatabaseContainers,
	id: string
): Promise<User | null> {
	const item = (await db.configs.item(id, id).read()).resource;
	const result = UserModel.safeParse(item);
	if (result.success) return result.data;
	return null;
}

async function getUserPassword(
	container: Container,
	id: string
): Promise<UserPassword | null> {
	const item = (await container.item(id, id).read()).resource;
	const result = UserPasswordModel.safeParse(item);
	if (result.success) return result.data;
	console.warn('failed parsing user password schema: ', result.error);
	return null;
}

export async function getUserSubmissions(
	container: DatabaseContainers,
	user: User | null
): Promise<Submission[] | null> {
	if (!user) return null;

	const querySpec = {
		query:
			'SELECT * FROM c WHERE ARRAY_CONTAINS(@integrationIds, c.integration.id)',
		parameters: [{ name: '@integrationIds', value: user.integrations }]
	};
	const items = await container.submissions.items.query(querySpec).fetchAll();
	const result = z.array(SubmissionModel).safeParse(items.resources);
	if (result.success) return result.data;
	console.warn('failed parsing user submissions schema: ', result.error);
	return null;
}

const checkIfRegistered = async (db: DatabaseContainers, id: string) =>
	Boolean(await getUser(db, id));

const updateUserConfig = async (db: DatabaseContainers, user: User) =>
	await db.configs.items?.upsert(user);

const updateUserPassword = async (
	db: DatabaseContainers,
	userPassword: UserPassword
) => await db.passwords.items?.upsert(userPassword);

const updateIntegration = async (
	db: DatabaseContainers,
	integration: AnyIntegration
) => await db.integrations.items?.upsert(integration);

export async function registerNewUser(
	db: DatabaseContainers,
	details: registrationDetails
) {
	const userId = emailToId(details.email);

	if (await checkIfRegistered(db, userId))
		throw Error('Email already registered');

	const user = UserModel.parse({
		id: userId,
		name: details.name,
		email: details.email,
		integrations: []
	} as User);

	const userPassword = UserPasswordModel.parse({
		id: userId,
		password_hash: await hashPassword(details.password)
	} as UserPassword);

	await Promise.all([
		updateUserConfig(db, user),
		updateUserPassword(db, userPassword)
	]);

	return user;
}

export async function tryToLogin(
	db: DatabaseContainers,
	details: loginDetails
): Promise<User | null> {
	const userId = emailToId(details.email);
	const userPassword = await getUserPassword(db.passwords, userId);
	const passwordHash = userPassword?.password_hash ?? '';
	const result = await bcrypt.compare(details.password, passwordHash);
	return result ? await getUser(db, userId) : null;
}

export async function listAllUsers(db: DatabaseContainers): Promise<User[]> {
	const { resources } = await db.configs.items.readAll<User>().fetchAll();
	return resources ?? [];
}

export async function getUserIntegrations(
	db: DatabaseContainers,
	user: User
): Promise<AnyIntegration[] | null> {
	const querySpec = {
		query: 'SELECT * FROM c WHERE ARRAY_CONTAINS(@integrationIds, c.id)',
		parameters: [{ name: '@integrationIds', value: user.integrations }]
	};
	const items = await db.integrations.items.query(querySpec).fetchAll();
	const result = z.array(AnyIntegrationModel).safeParse(items.resources);
	if (result.success) return result.data;
	console.warn('failed parsing integrations schema: ', result.error);
	return null;
}
