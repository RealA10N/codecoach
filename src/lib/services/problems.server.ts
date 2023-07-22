import type { Problem, ProblemGroup, Session } from '$lib/models/Problem';
import { SubmissionVerdict, type UserSubmissions } from '$lib/models/submissions';

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

function isProblemAccepted(problem: Problem, submissions: UserSubmissions): boolean {
	const acceptedSubmissions = submissions.submissions.filter(submission => submission.verdict == SubmissionVerdict.accepted);
	const acceptedProblemUrls = acceptedSubmissions.map(sub => sub.problem_url);
	return acceptedProblemUrls.includes(problem.url);
}

function markSolvedProblems(
	problems: Problem[] | undefined,
	submissions: UserSubmissions
) {
	if (!problems) return undefined;
	return problems.map(
		(problem) =>
			({ solved: isProblemAccepted(problem, submissions), ...problem } as Problem)
	);
}

export function markSolvedProblemsInSession(
	sessions: Session[],
	submissions: UserSubmissions | null
): Session[] {
	if (!submissions) return sessions;
	return sessions.map(
		(session) =>
		({
			...session,
			problems: {
				...session.problems,
				public: markSolvedProblems(session?.problems?.public, submissions),
				extra: markSolvedProblems(session?.problems?.extra, submissions)
			}
		} as Session)
	);
}
