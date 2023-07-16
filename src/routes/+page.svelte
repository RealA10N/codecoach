<script lang="ts">
	import SessionBox from '$lib/components/session/SessionBox.svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

{#each data.sessions as session}
	<SessionBox {session} />
{/each}
