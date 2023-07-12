<script lang="ts">
	import { getContext } from 'svelte';
	import { tabContextId } from './Tabs.svelte';
	const { selectedTab, selectTab } = getContext(tabContextId);
	export let id: string;
</script>

<button class:selected={$selectedTab === id} on:click={() => selectTab(id)}>
	<slot />
</button>
