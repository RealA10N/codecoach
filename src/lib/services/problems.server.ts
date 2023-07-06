import problemsets from '$src/problems.json';
import type { Problem, ProblemGroup } from '$lib/models/Problem';

export function getAvailableProblems(): ProblemGroup[] {
	const now = new Date(Date.now());

	return (problemsets as ProblemGroup[]).map((set) => {
		if (!set?.availableAt) return set;
		else {
			const date = new Date(set.availableAt);
			if (date <= now) return set;
			const { publicProblems, extraProblems, ...other } = set;
			return other;
		}
	});
}

function markSolvedProblemsInProblemList(
	problems: Problem[],
	solutions: string[]
) {
	return problems.map(
		(problem) =>
			({ solved: solutions.includes(problem.url), ...problem } as Problem)
	);
}

export function markSolvedProblems(
	problemsets: ProblemGroup[],
	solutions: string[] | null
): ProblemGroup[] {
	if (!solutions) return problemsets;
	return problemsets.map((set) => ({
		...set,
		...(set?.publicProblems && {
			publicProblems: markSolvedProblemsInProblemList(
				set.publicProblems,
				solutions
			)
		}),
		...(set?.extraProblems && {
			extraProblems: markSolvedProblemsInProblemList(
				set.extraProblems,
				solutions
			)
		})
	}));
}
