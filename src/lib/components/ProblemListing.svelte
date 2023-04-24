<script lang="ts">
	import Fa from 'svelte-fa';
	import { faCode } from '@fortawesome/free-solid-svg-icons';
	import Tooltip from '$lib/components/Tooltip.svelte';

	export let title: string;
	export let subtitle: string | null = null;
	export let url: string;
	export let isAccepted: boolean = false;
</script>

<div
	class="relative flex py-1 px-3 transition-colors {isAccepted
		? 'accepted'
		: 'not-applicable'}"
>
	<a class="flex-1 text-center no-underline" href={url} target="_blank">
		{title}
		{#if subtitle}
			<span class="text-xs opacity-70 absolute invisible sm:visible sm:relative"
				>{subtitle}</span
			>
		{/if}
	</a>

	{#if isAccepted}
		<a
			href="https://codeforces.com"
			target="_blank"
			class="absolute right-0 px-3"
		>
			<Tooltip text="View submission code">
				<Fa icon={faCode} class="my-1 opacity-80" />
			</Tooltip>
		</a>
	{/if}
</div>

<style lang="postcss">
	.accepted {
		@apply bg-green-200 hover:bg-green-300 dark:bg-green-900 dark:hover:bg-green-800;
	}

	.not-applicable {
		@apply bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700;
	}
</style>
