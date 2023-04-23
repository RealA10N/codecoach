<script lang="ts">
	import ProblemGroup from '$lib/components/ProblemGroup.svelte';
	import type Problem from '$lib/models/Problem';
	import AuthHeader from '$src/lib/components/AuthHeader.svelte';
	let problems = [
		{
			title: 'Missing Number',
			subtitle: 'CSES Introductory Problems',
			url: 'https://cses.fi/problemset/task/1083'
		},
		{
			title: 'Increasing Array',
			subtitle: 'CSES Introductory Problems',
			url: 'https://cses.fi/problemset/task/1094'
		},
		{
			title: 'Distinct Numbers',
			subtitle: 'CSES Sorting and Searching',
			url: 'https://cses.fi/problemset/task/1621'
		},
		{
			title: 'Insert Digit',
			subtitle: 'Codeforces Round 863 (Div. 3)',
			url: 'https://codeforces.com/contest/1811/problem/A'
		}
	] satisfies Problem[];
</script>

<AuthHeader />

<ProblemGroup title="Introduction" subtitle="Week 1" {problems}>
	Welcome to Competitive Programming! 🎉 In this first training session, you
	will mainly get to know
	<a href="https://codeforce.com" target="_blank">Codeforces</a>
	and <a href="https://cses.fi/problemset" target="_blank">CSES</a>, two popular
	online judges for competitive programming, that we will be using this
	semester. Are you ready to dive into your first challenge? 💻🚀
</ProblemGroup>
