<script lang="ts">
	import ProblemListing from '$lib/components/ProblemListing.svelte';
	import type Problem from '$lib/models/Problem';

	export let title: string;
	export let subtitle: string | null = null;
	export let problems: Problem[];
</script>

<div class="my-8">
	<h2 class="font-bold mt-4 mb-2 text-3xl">
		{title}
		{#if subtitle}<span class="font-light text-lg">{subtitle}</span>{/if}
	</h2>

	<p class="my-2">
		<slot />
	</p>

	{#each problems as problem}
		<ProblemListing {...problem} isAccepted={false} />
	{/each}
</div>
