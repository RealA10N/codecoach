<script lang="ts">
	import { fly } from 'svelte/transition';
	export let inner: any;
</script>

{#key inner}
	<div
		class="absolute inline-block"
		in:fly|local={{ y: '-100%' }}
		out:fly|local={{ y: '100%' }}
	>
		{inner}
	</div>
{/key}

<!-- This is a placeholder that preserves place in the DOM for the element
above, that has the display: absolute position. We use the absolute positioning
to allow both the incoming and exiting elements in the transition to overlap. -->
<div class="inline-block invisible">{inner}</div>
