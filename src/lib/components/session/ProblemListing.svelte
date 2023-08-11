<script lang="ts">
	import type { Problem } from '$lib/models/session';
	export let problem: Problem;

	let className =
		problem?.verdict ??
		(problem.notTrackable ? 'not-trackable' : 'not-applicable');
</script>

<div
	class="relative flex py-1 px-3 hover:z-10 hover:scale-[1.025] transition-all
		select-none {className}"
>
	<a class="flex-1 text-center no-underline" href={problem.url} target="_blank">
		{problem.title}
		{#if problem.subtitle}
			<span class="text-xs opacity-70 absolute invisible sm:visible sm:relative"
				>{problem.subtitle}</span
			>
		{/if}
	</a>
</div>

<style lang="postcss">
	.accepted {
		@apply bg-green-300 hover:bg-green-400 dark:bg-green-900 dark:hover:bg-green-800;
	}

	.rejected {
		@apply bg-red-200 hover:bg-red-300 dark:bg-red-900 dark:hover:bg-red-800;
	}

	.not-applicable {
		@apply bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700;
	}

	.not-trackable {
		@apply bg-cyan-200 hover:bg-cyan-300 dark:bg-cyan-800 dark:hover:bg-cyan-700;
	}
</style>
