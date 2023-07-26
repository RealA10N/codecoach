<script lang="ts">
	import type { UserConfig } from '$lib/models/user';
	import Fa from 'svelte-fa';
	import {
		faRightToBracket,
		faRightFromBracket
	} from '@fortawesome/free-solid-svg-icons';

	export let user: UserConfig | null;
</script>

<header class="text-center mx-auto mt-8">
	{#if user}
		<a rel="external" href="/logout" class="inline-block no-underline">
			Welcome, {user.name}
			<Fa icon={faRightFromBracket} fw class="inline-block ml-1" />
		</a>
	{:else}
		<a rel="external" href="/login" class="inline-block no-underline">
			<Fa icon={faRightToBracket} fw class="inline-block mr-1" />
			Login to view progress
		</a>
	{/if}
</header>
