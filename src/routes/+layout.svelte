<script lang="ts">
	import '$src/app.css';
	import '@fontsource/inter/200.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/800.css';
	import '@fontsource/comic-neue';

	import type { LayoutServerData } from './$types';
	import LayoutPanel from '$lib/components/LayoutPanel.svelte';
	export let data: LayoutServerData;
</script>

<main class="mx-auto flex max-w-fit flex-wrap justify-center my-8">
	<LayoutPanel>
		<slot />
	</LayoutPanel>
</main>
