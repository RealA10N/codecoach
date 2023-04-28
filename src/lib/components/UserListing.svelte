<script lang="ts">
	import type { UserConfig } from '$lib/models/user';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import Codeforces from '$lib/components/codeforces.svelte';
	import Cses from '$lib/components/Cses.svelte';

	export let user: UserConfig;
</script>

<div
	class="flex items-center py-1 px-3 hover:z-10 hover:scale-[1.025] transition-all select-none
	bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700
	fill-neutral-500 dark:fill-neutral-400"
>
	<span class="flex-1 flex items-center">
		<span>
			{user.name}
			<span class="text-xs opacity-70 invisible absolute sm:visible sm:relative"
				>{user.email}</span
			>
		</span>
	</span>

	{#if user.codeforces}
		<Tooltip text="View Codeforces profile">
			<a
				class="ml-2 hover:scale-[1.15]"
				href="https://codeforces.com/profile/{user.codeforces}"
				target="_blank"
			>
				<Codeforces />
			</a>
		</Tooltip>
	{/if}

	{#if user.cses}
		<Tooltip text="View CSES profile">
			<a
				class="ml-2 hover:scale-[1.15]"
				href="https://cses.fi/user/{user.cses}"
				target="_blank"
			>
				<Cses />
			</a>
		</Tooltip>
	{/if}
</div>
