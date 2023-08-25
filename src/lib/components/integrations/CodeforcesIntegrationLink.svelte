<script lang="ts">
	import type { CodeforcesIntegration } from '$src/lib/models/integration';
	import CodeforcesIcon from './CodeforcesIcon.svelte';

	export let integration: CodeforcesIntegration;
</script>

<a
	href="https://codeforces.com/profile/{integration.handle}"
	target="_blank"
	class="no-underline"
>
	<CodeforcesIcon />
	{integration.handle}
</a>
