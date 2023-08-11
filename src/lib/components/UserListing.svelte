<script lang="ts">
	import type { User } from '$lib/models/user';
	import { Platform } from '$lib/models/integration';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import Codeforces from '$lib/components/Codeforces.svelte';
	import Cses from '$lib/components/Cses.svelte';
	import Fa from 'svelte-fa';
	import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

	export let user: User;
	export let hasAdminPermissions: boolean;
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

	{#each user.integrations as integration}
		{#if integration.platform == Platform.codeforces}
			<Tooltip text="View Codeforces profile">
				<a
					class="ml-2 hover:scale-[1.15]"
					href="https://codeforces.com/profile/{integration.handle}"
					target="_blank"
				>
					<Codeforces />
				</a>
			</Tooltip>
		{:else if integration.platform == Platform.cses}
			<Tooltip text="View CSES profile">
				<a
					class="ml-2 hover:scale-[1.15]"
					href="https://cses.fi/user/{integration.user_number}"
					target="_blank"
				>
					<Cses />
				</a>
			</Tooltip>
		{/if}
	{/each}

	{#if hasAdminPermissions}
		<Tooltip text="Login as {user.name}">
			<a
				href="/users?adminLogin={user.id}"
				target="_parent"
				class="inline-block align-middle ml-2"
			>
				<Fa icon={faRightToBracket} />
			</a>
		</Tooltip>
	{/if}
</div>
