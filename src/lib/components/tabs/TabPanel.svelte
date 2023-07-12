<script lang="ts">
	import { getContext } from 'svelte';
	import { tabContextId } from './Tabs.svelte';
	const { selectedTab } = getContext(tabContextId);
	export let id: string;
</script>

{#if $selectedTab === id}
	<slot />
{/if}
