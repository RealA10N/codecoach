<script lang="ts">
	import ResourceListing from './ResourceListing.svelte';
	import type { Resource } from '$lib/models/session';
	export let resources: Resource[];
</script>

{#each resources || [] as resource}
	<ResourceListing {resource} />
{/each}
