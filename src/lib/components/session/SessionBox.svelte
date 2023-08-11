<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import { Tabs, Tab, TabList, TabPanel } from '$lib/components/tabs/tabs';
	import type { Session } from '$lib/models/session';
	import ProblemsBox from '$lib/components/session/ProblemsBox.svelte';
	import ResourcesBox from './ResourcesBox.svelte';

	export let session: Session;
	let selectedId: string = 'problems';
	$: showTabs = Boolean(session.resources);
</script>

<div class="my-8">
	<h2 class="font-bold mt-4 mb-2 text-3xl">
		{session.title}
		{#if session.subtitle}
			<span class="font-light text-lg">{session.subtitle}</span>
		{/if}
	</h2>

	{#if session.body}
		<p class="my-2">
			<SvelteMarkdown source={session.body} />
		</p>
	{/if}

	<Tabs {selectedId}>
		{#if showTabs}
			<TabList>
				<Tab id="problems">Problems</Tab>
				<Tab id="resources">Resources</Tab>
			</TabList>
		{/if}

		<TabPanel id="problems">
			<ProblemsBox problems={session.problems} />
		</TabPanel>

		{#if showTabs}
			<TabPanel id="resources">
				<ResourcesBox resources={session.resources} />
			</TabPanel>
		{/if}
	</Tabs>
</div>
