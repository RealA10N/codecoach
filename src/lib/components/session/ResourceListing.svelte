<script lang="ts">
	import type { Resource } from '$lib/models/Problem';
	import { ResourceType } from '$lib/models/Problem';
	import Model from '$lib/components/model/Model.svelte';
	import ExternalCodeSnippet from '../snippet/ExternalCodeSnippet.svelte';
	export let resource: Resource;
	let showModel: boolean = false;
</script>

<div
	class="relative flex py-1 px-3 hover:z-10 hover:scale-[1.025]
        transition-all select-none
        bg-neutral-200 hover:bg-neutral-300
        dark:bg-neutral-800 dark:hover:bg-neutral-700"
>
	{#if resource.type === ResourceType.snippet}
		<a on:click={() => (showModel = true)}>
			{resource.title}
			{#if resource.subtitle}
				<span>{resource.subtitle}</span>
			{/if}
		</a>

		<Model bind:showModel>
			<h3 class="text-neutral-200 my-2">{resource.title}</h3>
			<ExternalCodeSnippet url={resource.url} language="cpp" />
		</Model>
	{:else}
		<a href={resource.url} target="_blank">
			{resource.title}
			{#if resource.subtitle}
				<span>{resource.subtitle}</span>
			{/if}
		</a>
	{/if}
</div>

<style lang="postcss">
	a {
		@apply flex-1 text-center no-underline cursor-pointer;
	}

	span {
		@apply text-xs opacity-70 absolute invisible sm:visible sm:relative;
	}
</style>
