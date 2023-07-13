<script lang="ts">
	import type { Resource, ResourceType } from '$lib/models/Problem';
	export let resource: Resource;
</script>

<div
	class="relative flex py-1 px-3 hover:z-10 hover:scale-[1.025]
        transition-all select-none
        bg-neutral-200 hover:bg-neutral-300
        dark:bg-neutral-800 dark:hover:bg-neutral-700"
>
	<a
		class="flex-1 text-center no-underline"
		href={resource.url}
		target="_blank"
	>
		{resource.title}
		{#if resource.subtitle}
			<span class="text-xs opacity-70 absolute invisible sm:visible sm:relative"
				>{resource.subtitle}</span
			>
		{/if}
	</a>
</div>
