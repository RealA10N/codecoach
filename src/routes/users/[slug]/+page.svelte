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

<div class="inline-flex gap-1">
	{#each data.integrations ?? [] as integration}
		<AnyIntegrationLink {integration} />
	{/each}

	{#if data.isLoggedUser}
		<button class="align-middle px-2 py-1 no-underline cursor-pointer">
			<!-- TODO: add onclick action!-->
			<Fa icon={faEdit} class="inline-block" /> Edit
		</button>
	{/if}
</div>
