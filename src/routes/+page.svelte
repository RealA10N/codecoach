<script lang="ts">
	import LayoutPanel from '$lib/components/LayoutPanel.svelte';
	import SessionBox from '$lib/components/session/SessionBox.svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<LayoutPanel>
	{#each data.sessions as session}
		<SessionBox {session} />
	{/each}
</LayoutPanel>
