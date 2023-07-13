import type { Problem, ProblemGroup, Session } from '$lib/models/Problem';

import sessionsJson from '$src/sessions.json';
const sessions: Session[] = sessionsJson;

export function getAvailableSessions(): Session[] {
	const notHiddenOnly = sessions.filter((session) => !session?.hidden);
	return notHiddenOnly.map(maskAvailableSession);
}

function maskAvailableSession(session: Session): Session {
	return {
		...session,
		problems: maskAvailableProblems(session.problems)
	};
}

function maskAvailableProblems(problems: ProblemGroup): ProblemGroup {
	// Remove problems that are not available yet on the server side.
	if (!problems.availableAt) return problems;
	const now = new Date(Date.now());
	const date = new Date(problems.availableAt);
	if (date <= now) return problems;
	return { availableAt: problems.availableAt };
}

function markSolvedProblems(
	problems: Problem[] | undefined,
	solutions: string[]
) {
	if (!problems) return undefined;
	return problems.map(
		(problem) =>
			({ solved: solutions.includes(problem.url), ...problem } as Problem)
	);
}

export function markSolvedProblemsInSession(
	sessions: Session[],
	solutions: string[] | null
): Session[] {
	if (!solutions) return sessions;
	return sessions.map(
		(session) =>
			({
				...session,
				problems: {
					...session.problems,
					public: markSolvedProblems(session?.problems?.public, solutions),
					extra: markSolvedProblems(session?.problems?.extra, solutions)
				}
			} as Session)
	);
}
