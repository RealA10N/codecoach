<script lang="ts">
	import ProblemListing from '$lib/components/ProblemListing.svelte';
	import type Problem from '$src/lib/models/problem';
	import Fa from 'svelte-fa';
	import {
		faLock,
		faLockOpen,
		faStar
	} from '@fortawesome/free-solid-svg-icons';
	import type { SolutionId } from '../models/user';
	import type { ProblemGroup } from '$src/lib/models/problem';

	export let problemGroup: ProblemGroup;
	export let solutions: SolutionId[] | null;

	function isSolved(problem: Problem) {
		return solutions?.includes(problem.url) ?? false;
	}

	let unsolvedPublicProblemsCount = problemGroup.publicProblems.filter(
		(problem) => !isSolved(problem)
	).length;

	let unsolvedExtraProblemsCount = problemGroup.extraProblems.filter(
		(problem) => !isSolved(problem)
	).length;
</script>

<div class="my-8">
	<h2 class="font-bold mt-4 mb-2 text-3xl">
		{problemGroup.title}
		{#if problemGroup.subtitle}
			<span class="font-light text-lg">{problemGroup.subtitle}</span>
		{/if}
	</h2>

	<p class="my-2">
		<slot />
	</p>

	{#each problemGroup.publicProblems as problem}
		<ProblemListing {...problem} isSolved={isSolved(problem)} />
	{/each}

	{#if unsolvedPublicProblemsCount === 0}
		{#each problemGroup.extraProblems as problem}
			<ProblemListing {...problem} isSolved={isSolved(problem)} />
		{/each}
	{/if}

	{#if solutions !== null && problemGroup.extraProblems}
		<p class="text-center my-2 text-sm">
			{#if unsolvedPublicProblemsCount === 0 && unsolvedExtraProblemsCount === 0}
				<Fa icon={faStar} class="inline opacity-50" fw />
			{:else if unsolvedPublicProblemsCount === 0}
				<Fa icon={faLockOpen} class="inline opacity-50" fw />
			{:else}
				<Fa icon={faLock} class="inline opacity-50" fw />
			{/if}

			{#if unsolvedPublicProblemsCount === problemGroup.publicProblems.length}
				Solve all problems to unlock additional ones!
			{:else if unsolvedPublicProblemsCount > 1}
				Solve {unsolvedPublicProblemsCount} more problems to unlock additional ones!
			{:else if unsolvedPublicProblemsCount === 1}
				One more problem to unlock the additional ones!
			{:else if unsolvedExtraProblemsCount === 0}
				Good job! You have solved all available problems.
			{:else}
				Additional problems unlocked!
			{/if}
		</p>
	{/if}
</div>
