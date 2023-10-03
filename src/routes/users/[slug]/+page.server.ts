import {
	getUserIntegrations,
	getUser,
	getUserSubmissions
} from '$lib/services/db.server';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { User } from '$lib/models/user';
import { SubmissionVerdict, type Submission } from '$lib/models/submission';

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
	const statPanels = await getStatPanels(
		(await getUserSubmissions(locals.db, user)) ?? []
	);
	return { user, integrations, isLoggedUser, statPanels };
};

const getStatPanels = async (submissions: Submission[]) => {
	const panels: statPanel[] = [];

	panels.push({
		stat: submissions.length,
		units: 'Submissions',
		info: 'Submitted all time'
	});

	const acceptedSubmissions = submissions.filter(
		(submission) => submission.verdict == SubmissionVerdict.Enum.accepted
	);
	panels.push({
		stat: acceptedSubmissions.length,
		units: 'Submissions',
		info: 'Accepted all time'
	});

	panels.push({
		stat: new Set(
			acceptedSubmissions.map((submissions) => submissions.problem.id)
		).size,
		units: 'Problems',
		info: 'Solved all time'
	});

	return panels;
};
