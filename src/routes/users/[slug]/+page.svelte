<script lang="ts">
	import type { PageServerData } from './$types';
	import AnyIntegrationLink from '$lib/components/integrations/AnyIntegrationLink.svelte';

	export let data: PageServerData;
	console.log(data.integrations);
</script>

<h2 class="text-3xl">
	{data.user?.name}

	{#if data.integrations}
		<span class="inline-flex gap-1">
			{#each data.integrations as integration}
				<AnyIntegrationLink {integration} />
			{/each}
		</span>
	{/if}
</h2>
