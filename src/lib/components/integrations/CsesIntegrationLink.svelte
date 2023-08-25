<script lang="ts">
	import type { CsesIntegration } from '$src/lib/models/integration';
	import CsesIcon from './CsesIcon.svelte';

	export let integration: CsesIntegration;
</script>

<a
	href="https://cses.fi/user/{integration.user_number}"
	target="_blank"
	class="no-underline"
>
	<CsesIcon />
	{integration.user_number}
</a>
