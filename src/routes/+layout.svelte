<script lang="ts">
	import '$src/app.css';
	import '@fontsource/inter/200.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/800.css';
	import '@fontsource/comic-neue';

	import type { LayoutServerData } from './$types';
	import AuthHeader from '$lib/components/AuthHeader.svelte';
	export let data: LayoutServerData;
</script>

<AuthHeader user={data.loggedInUser} />

<main class="mx-auto flex max-w-fit">
	<slot />
</main>
