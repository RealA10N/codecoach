<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import Rolling from './Rolling.svelte';

	export let goal: Date | null;

	let seconds: number = Infinity,
		minutes: number = Infinity,
		hours: number = Infinity;
	let goalPassed: boolean = true;

	const update = () => {
		let secondsDiff: number = Math.floor((+goal! - Date.now()) / 1000);
		goalPassed = secondsDiff <= 0;
		seconds = Math.floor(secondsDiff % 60);
		minutes = Math.floor((secondsDiff / 60) % 60);
		hours = Math.floor(secondsDiff / (60 * 60));
	};

	onMount(() => {
		if (goal) {
			update();
			setInterval(update, 1000);
		}
	});
</script>

{#if goalPassed}
	<div in:scale>
		<slot />
	</div>
{:else}
	<div
		class="text-center p-4 font-medium bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
	>
		{#if hours > 0}
			Unlocking problems in <Rolling inner={hours} /> hours.
		{:else if minutes > 0}
			Unlocking problems in <Rolling inner={minutes} /> minutes and <Rolling
				inner={seconds}
			/> seconds!
		{:else}
			Unlocking problems in <Rolling inner={seconds} /> seconds!
		{/if}
	</div>
{/if}
