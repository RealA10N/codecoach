<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import Rolling from './Rolling.svelte';

	export let goal: Date | string | null;

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
		if (typeof goal == 'string') goal = new Date(goal);
		if (goal) {
			update();
			setInterval(update, 1000);
		}
	});
</script>

{#if goalPassed}
	<div in:scale={{ delay: 400 }}>
		<slot />
	</div>
{:else}
	<div
		class="text-center p-4 font-medium bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
		out:scale={{ duration: 400 }}
	>
		Unlocking problems in
		{#if hours > 0}
			<Rolling inner={hours} /> hours,
		{/if}
		<Rolling inner={minutes} /> minutes and
		<Rolling inner={seconds} /> seconds!
	</div>
{/if}
