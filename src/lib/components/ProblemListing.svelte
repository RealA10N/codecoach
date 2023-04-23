<script lang="ts">
	export let title: string;
	export let subtitle: string;
	export let url: string;
	export let isAccepted: boolean = false;
</script>

<a
	class="py-1 px-3 transition-colors w-full inline-block text-center
		{isAccepted ? 'accepted' : 'not-applicable'}"
	href={url}
	target="_blank"
>
	{title}
	<span class="text-xs opacity-50">{subtitle}</span>
</a>

<style lang="postcss">
	.accepted {
		@apply bg-green-200 hover:bg-green-300 dark:bg-green-900 dark:hover:bg-green-800;
	}

	.not-applicable {
		@apply bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700;
	}
</style>
