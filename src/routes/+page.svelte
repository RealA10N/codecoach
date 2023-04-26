<script lang="ts">
	import ProblemGroup from '$lib/components/ProblemGroup.svelte';
	import AuthHeader from '$src/lib/components/AuthHeader.svelte';
	import type { PageServerData } from './$types';
	import w1 from '$src/problems/week1.json';

	export let data: PageServerData;
</script>

<AuthHeader user={data.user} />

<ProblemGroup problemGroup={w1} solutions={data.solutions}>
	Welcome to Competitive Programming! 🎉 In this first training session, you
	will mainly get to know
	<a href="https://codeforce.com" target="_blank">Codeforces</a>
	and <a href="https://cses.fi/problemset" target="_blank">CSES</a>, two popular
	online judges for competitive programming that we will be using this semester.
	It is also highly encouraged to solve the problems using C++ and getting used
	to it if you are not quite familiar with the language yet. Have fun! 🙂
</ProblemGroup>
