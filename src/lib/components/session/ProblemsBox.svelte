<script lang="ts">
	import ProblemListing from '$src/lib/components/session/ProblemListing.svelte';
	import type { Problem, ProblemGroup } from '$lib/models/problem';
	import Fa from 'svelte-fa';
	import {
		faLock,
		faLockOpen,
		faStar
	} from '@fortawesome/free-solid-svg-icons';
	import Countdown from '$lib/components/countdown/Countdown.svelte';

	export let problems: ProblemGroup;

	function isSolved(problem: Problem): boolean {
		return problem?.solved ?? false;
	}

	const countUnsolved = (problems: Problem[] | undefined) =>
		(problems || []).filter((problem) => !isSolved(problem)).length;

	const countSolved = (problems: Problem[] | undefined) =>
		(problems?.length ?? 0) - countUnsolved(problems);

	const solvedAll = (problems: Problem[] | undefined) =>
		!problems || countUnsolved(problems) === 0;

	const extraProblemsAvailable = Boolean(
		countUnsolved(problems?.public) === 0 && 'extra' in problems
	);
</script>

<Countdown goal={problems?.availableAt || null}>
	{#each problems?.public || [] as problem}
		<ProblemListing {problem} />
	{/each}

	{#if extraProblemsAvailable}
		{#each problems?.extra || [] as problem}
			<ProblemListing {problem} />
		{/each}
	{/if}

	{#if problems?.extra}
		<p class="text-center my-2 text-sm">
			{#if solvedAll(problems?.public) && solvedAll(problems?.extra)}
				<Fa icon={faStar} class="inline opacity-50" fw />
			{:else if solvedAll(problems?.public)}
				<Fa icon={faLockOpen} class="inline opacity-50" fw />
			{:else}
				<Fa icon={faLock} class="inline opacity-50" fw />
			{/if}

			{#if countSolved(problems?.public) === 0}
				Solve all problems to unlock extra ones!
			{:else if countUnsolved(problems?.public) > 1}
				Solve {countUnsolved(problems.public)} more problems to unlock extra ones!
			{:else if countUnsolved(problems?.public) === 1}
				Solve one more problem to unlock the extra ones!
			{:else if solvedAll(problems?.extra)}
				Good job! You have solved all available problems.
			{:else}
				Additional problems unlocked!
			{/if}
		</p>
	{/if}
</Countdown>
