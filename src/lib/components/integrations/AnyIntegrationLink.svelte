<script lang="ts">
	import { type AnyIntegration, Platform } from '$src/lib/models/integration';
	import CodeforcesIntegrationLink from './CodeforcesIntegrationLink.svelte';
	import CsesIntegrationLink from './CsesIntegrationLink.svelte';

	export let integration: AnyIntegration;
</script>

<span
	class="fill-neutral-600 dark:fill-neutral-400
		hover:scale-110 hover:shadow-md px-2 py-1
		border-neutral-200 dark:border-neutral-700 border-[1px] rounded-md
		bg-neutral-500 dark:bg-neutral-800 bg-opacity-5"
>
	{#if integration.platform == Platform.codeforces}
		<CodeforcesIntegrationLink {integration} />
	{:else if integration.platform == Platform.cses}
		<CsesIntegrationLink {integration} />
	{/if}
</span>
