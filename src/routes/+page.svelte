<script lang="ts">
	import SessionBox from '$lib/components/session/SessionBox.svelte';
	import AuthHeader from '$lib/components/AuthHeader.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<AuthHeader user={data.loggedInUser} />

{#each data.sessions as session}
	<SessionBox {session} />
{/each}
