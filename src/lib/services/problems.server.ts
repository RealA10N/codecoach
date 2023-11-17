import type { Problem, ProblemGroup, Session } from '$src/lib/models/session';
import { SubmissionVerdict, type Submission } from '$lib/models/submission';

import sessionsJson from '$src/sessions.json';
const sessions: Session[] = sessionsJson;

export function getAvailableSessions(): Session[] {
	const notHiddenOnly = sessions.filter((session) => !session?.hidden);
	return notHiddenOnly.map(maskAvailableSession);
}

function maskAvailableSession(session: Session): Session {
	if (!session.problems) return session;
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

function getProblemVerdict(
	problem: Problem,
	submissions: Submission[]
): { verdict?: SubmissionVerdict } {
	const acceptedSubmissionUrls = submissions
		.filter((sub) => sub.verdict == SubmissionVerdict.enum.accepted)
		.map((sub) => sub.problem.problem_url);
	if (acceptedSubmissionUrls.includes(problem.url))
		return { verdict: SubmissionVerdict.enum.accepted };

	const rejectedSubmissionUrls = submissions
		.filter((sub) => sub.verdict == SubmissionVerdict.enum.rejected)
		.map((sub) => sub.problem.problem_url);
	if (rejectedSubmissionUrls.includes(problem.url))
		return { verdict: SubmissionVerdict.enum.rejected };

	return {};
}

function markSolvedProblems(
	problems: Problem[] | undefined,
	submissions: Submission[]
) {
	if (!problems) return undefined;
	return problems.map(
		(problem) =>
			({
				...getProblemVerdict(problem, submissions),
				...problem
			} as Problem)
	);
}

function markSolvedProblemsInSession(
	session: Session,
	submissions: Submission[]
): Session {
	if (!session.problems) return session;
	return {
		...session,
		problems: {
			...session.problems,
			public: markSolvedProblems(session.problems.public, submissions),
			extra: markSolvedProblems(session.problems.extra, submissions)
		}
	} as Session;
}

export function markSolvedProblemsInSessions(
	sessions: Session[],
	submissions: Submission[] | null
): Session[] {
	if (submissions === null) return sessions;
	return sessions.map((session) =>
		markSolvedProblemsInSession(session, submissions)
	);
}
