<script lang="ts">
	import { getContext } from 'svelte';
	import { tabContextId } from './Tabs.svelte';
	const { selectedTab, selectTab } = getContext(tabContextId);
	export let id: string;
</script>

<button class:selected={$selectedTab === id} on:click={() => selectTab(id)}>
	<slot />
</button>

<style lang="postcss">
	button {
		@apply mx-2 decoration-red-400
			text-neutral-600 dark:text-neutral-300
			hover:text-neutral-900 hover:dark:text-neutral-200;
	}

	.selected {
		@apply underline  dark:text-neutral-200 text-neutral-900;
	}
</style>
