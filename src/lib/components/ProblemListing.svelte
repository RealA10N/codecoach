<script lang="ts">
	export let title: string;
	export let subtitle: string | null = null;
	export let url: string;
	export let solved: boolean = false;
</script>

<div
	class="relative flex py-1 px-3 hover:z-10 hover:scale-[1.025] transition-all
		select-none {solved ? 'solved' : 'not-applicable'}"
>
	<a class="flex-1 text-center no-underline" href={url} target="_blank">
		{title}
		{#if subtitle}
			<span class="text-xs opacity-70 absolute invisible sm:visible sm:relative"
				>{subtitle}</span
			>
		{/if}
	</a>
</div>

<style lang="postcss">
	.solved {
		@apply bg-green-300 hover:bg-green-400 dark:bg-green-900 dark:hover:bg-green-800;
	}

	.not-applicable {
		@apply bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700;
	}
</style>
