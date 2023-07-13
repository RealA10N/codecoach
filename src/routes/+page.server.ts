import { getSolutions } from '$src/lib/services/db.server';
import {
	getAvailableSessions,
	markSolvedProblemsInSession
} from '$src/lib/services/problems.server';

export const load = async ({ locals }) => {
	const solutions = await getSolutions(
		locals.db,
		locals.loggedInUser?.id ?? null
	);

	const availableSessions = getAvailableSessions();
	const servedSessions = markSolvedProblemsInSession(
		availableSessions,
		solutions
	);

	return {
		loggedInUser: locals.loggedInUser,
		sessions: servedSessions
	};
};
