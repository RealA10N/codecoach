<script lang="ts">
	import { type AnyIntegration, Platform } from '$src/lib/models/integration';
	import CodeforcesIntegrationLink from './CodeforcesIntegrationLink.svelte';
	import CsesIntegrationLink from './CsesIntegrationLink.svelte';

	export let integration: AnyIntegration;
</script>

<span
	class="fill-neutral-600 hover:fill-neutral-800
		dark:fill-neutral-400 hover:dark:fill-neutral-200
		hover:scale-110"
>
	{#if integration.platform == Platform.codeforces}
		<CodeforcesIntegrationLink {integration} />
	{:else if integration.platform == Platform.cses}
		<CsesIntegrationLink {integration} />
	{/if}
</span>
