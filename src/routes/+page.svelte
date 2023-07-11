<script lang="ts">
	import ProblemGroup from '$lib/components/ProblemGroup.svelte';
	import AuthHeader from '$lib/components/AuthHeader.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<AuthHeader user={data.loggedInUser} />

{#each data.problems as problem}
	<ProblemGroup problemGroup={problem} />
{/each}
