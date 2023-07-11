import { getSolutions } from '$src/lib/services/db.server';
import {
	getAvailableProblems,
	markSolvedProblems
} from '$src/lib/services/problems.server';

export const load = async ({ locals }) => {
	const solutions = await getSolutions(
		locals.db,
		locals.loggedInUser?.id ?? null
	);

	const servedProblems = markSolvedProblems(getAvailableProblems(), solutions);
	return { loggedInUser: locals.loggedInUser, problems: servedProblems };
};
