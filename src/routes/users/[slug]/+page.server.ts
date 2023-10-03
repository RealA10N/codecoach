import {
	getUserIntegrations,
	getUser,
	type DatabaseContainers
} from '$lib/services/db.server';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { User } from '$lib/models/user';
import { SubmissionVerdict } from '$lib/models/submission';

type statPanel = {
	stat: number;
	units: string;
	info: string;
};

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = await getUser(locals.db, params.slug);
	if (!user) throw redirect(302, '/users');
	const integrations = user ? await getUserIntegrations(locals.db, user) : null;
	const isLoggedUser = locals.loggedInUser?.id == user?.id;
	const statPanels = await getStatPanels(locals.db, user);
	return { user, integrations, isLoggedUser, statPanels };
};

const getStatPanels = async (
	db: DatabaseContainers,
	user: User
): Promise<statPanel[]> => {
	const [submissionsCount, acceptedSubmissionsCount, solvedProblemsCount] =
		await Promise.all([
			getSubmissionsCount(db, user),
			getAcceptedSubmissionsCount(db, user),
			getSolvedProblemsCount(db, user)
		]);

	return [
		{
			stat: submissionsCount,
			units: 'Submissions',
			info: 'Submitted all time'
		},
		{
			stat: acceptedSubmissionsCount,
			units: 'Submissions',
			info: 'Accepted all time'
		},
		{
			stat: solvedProblemsCount,
			units: 'Problems',
			info: 'Solved all time'
		}
	];
};

const getSubmissionsCount = async (
	db: DatabaseContainers,
	user: User
): Promise<number> => {
	const { resources } = await db.submissions.items
		.query({
			query: `SELECT VALUE COUNT(1) FROM c
			WHERE ARRAY_CONTAINS(@integrationIds, c.integration.id)`,
			parameters: [{ name: '@integrationIds', value: user.integrations }]
		})
		.fetchAll();
	return resources[0] ?? 0;
};

const getAcceptedSubmissionsCount = async (
	db: DatabaseContainers,
	user: User
): Promise<number> => {
	const { resources } = await db.submissions.items
		.query({
			query: `SELECT VALUE COUNT(1) FROM c
					WHERE ARRAY_CONTAINS(@integrationIds, c.integration.id)
					AND c.verdict = @accepted`,
			parameters: [
				{ name: '@integrationIds', value: user.integrations },
				{ name: '@accepted', value: SubmissionVerdict.Enum.accepted }
			]
		})
		.fetchAll();
	return resources[0] ?? 0;
};

const getSolvedProblemsCount = async (
	db: DatabaseContainers,
	user: User
): Promise<number> => {
	const { resources } = await db.submissions.items
		.query({
			query: `SELECT VALUE COUNT(1) FROM (
				SELECT DISTINCT c.problem.id
				FROM c
				WHERE c.verdict = @accepted
				AND ARRAY_CONTAINS(@integrationIds, c.integration.id)
			)`,
			parameters: [
				{ name: '@integrationIds', value: user.integrations },
				{ name: '@accepted', value: SubmissionVerdict.Enum.accepted }
			]
		})
		.fetchAll();
	return resources[0] ?? 0;
};
