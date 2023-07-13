<script lang="ts">
	import { onMount } from 'svelte';
	import CodeSnippet from './CodeSnippet.svelte';

	export let url: string;
	export let language: string;

	let source: string;

	onMount(async () => {
		fetch(url)
			.then(async (response) => response.text())
			.then((data) => (source = data));
	});
</script>

<CodeSnippet {source} {language} />
