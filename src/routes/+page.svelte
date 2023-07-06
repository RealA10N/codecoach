<script lang="ts">
	import ProblemGroup from '$lib/components/ProblemGroup.svelte';
	import AuthHeader from '$src/lib/components/AuthHeader.svelte';
	import type { PageServerData } from './$types';
	import problems from '$src/problems.json';

	export let data: PageServerData;
</script>

<AuthHeader user={data.loggedInUser} />

{#each problems as problem}
	<ProblemGroup problemGroup={problem} solutions={data.solutions} />
{/each}
