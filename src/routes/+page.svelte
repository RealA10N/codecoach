<script lang="ts">
	import ProblemGroup from '$lib/components/ProblemGroup.svelte';
	import AuthHeader from '$src/lib/components/AuthHeader.svelte';
	import type { PageServerData } from './$types';
	import w0 from '$src/problems/week0.json';
	import w1 from '$src/problems/week1.json';

	export let data: PageServerData;
</script>

<AuthHeader user={data.loggedInUser} />

<ProblemGroup problemGroup={w0} solutions={data.solutions} />
<ProblemGroup problemGroup={w1} solutions={data.solutions} />
