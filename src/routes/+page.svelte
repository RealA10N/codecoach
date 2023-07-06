<script lang="ts">
	import ProblemGroup from '$lib/components/ProblemGroup.svelte';
	import AuthHeader from '$src/lib/components/AuthHeader.svelte';
	import type { PageServerData } from './$types';
	import w0 from '$src/problems/week0.json';
	import w1 from '$src/problems/week1.json';

	export let data: PageServerData;
</script>

<AuthHeader user={data.loggedInUser} />

<ProblemGroup problemGroup={w0} solutions={data.solutions}>
	Welcome to Competitive Programming! 👋 Our training sessions will officially
	begin in the next week, but until then you are more then welcome to start
	solving some problems by yourself!
</ProblemGroup>

<ProblemGroup problemGroup={w1} solutions={data.solutions}>
	Thanks for coming to the first session! 🎉 Today, you will mainly get to know
	<a href="https://codeforces.com" target="_blank">Codeforces</a>
	and <a href="https://cses.fi/problemset" target="_blank">CSES</a>, two popular
	online judges for competitive programming that we will be using this semester.
	It is also highly encouraged to solve the problems using C++ and getting used
	to it if you are not quite familiar with the language yet. Have fun! 🙂
</ProblemGroup>
