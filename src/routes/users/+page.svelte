<script lang="ts">
	import UserListing from '$src/lib/components/UserListing.svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<h1>Users</h1>

<div class="w-96">
	{#each data.users as user}
		<UserListing {user} />
	{/each}
</div>
