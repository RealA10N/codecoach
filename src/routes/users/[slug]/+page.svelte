<script lang="ts">
	import type { PageServerData } from './$types';
	import AnyIntegrationLink from '$lib/components/integrations/AnyIntegrationLink.svelte';
	import Fa from 'svelte-fa';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';

	export let data: PageServerData;
</script>

<h2 class="text-3xl">
	{data.user?.name}
</h2>

{#if data.user.integrations.length === 0}
	<div
		class="bg-neutral-200 dark:bg-neutral-800 my-2 p-4 rounded-lg leading-none text-center"
	>
		<h3 class="m-0">No data available</h3>
		<p class="mx-4">
			The user has not yet connected any third party judge to his account.
		</p>
	</div>
{:else}
	<div class="inline-flex gap-1">
		{#each data.integrations ?? [] as integration}
			<AnyIntegrationLink {integration} />
		{/each}

		{#if data.isLoggedUser}
			<button class="align-middle px-2 py-1 no-underline cursor-pointer">
				<!-- TODO: add onclick action! -->
				<Fa icon={faEdit} class="inline-block" /> Edit
			</button>
		{/if}
	</div>

	<div class="bg-neutral-200 dark:bg-neutral-800 my-2 p-2 rounded-lg">
		<div class="flex-wrap justify-around flex leading-none md:">
			{#each data.statPanels as panel}
				<div class="m-2">
					<h3 class="m-0">{panel.stat} {panel.units}</h3>
					<span class="text-sm">{panel.info}</span>
				</div>
			{/each}
		</div>
	</div>
{/if}
