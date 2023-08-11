<script lang="ts">
	import type { User } from '$lib/models/user';

	export let user: User;
</script>

<div
	class="flex items-center py-1 px-3 hover:z-10 hover:scale-[1.025] transition-all select-none
	bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700
	fill-neutral-500 dark:fill-neutral-400"
>
	<a href="/users/{user.id}" class="flex-1 flex items-center no-underline">
		<span>
			{user.name}
			<span class="text-xs opacity-70 invisible absolute sm:visible sm:relative"
				>{user.email}</span
			>
		</span>
	</a>
</div>
