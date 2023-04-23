<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faRightToBracket,
		faRightFromBracket
	} from '@fortawesome/free-solid-svg-icons';

	let name: string | null;
</script>

<div class="text-center sm:text-right">
	{#if name}
		<a href="/logout" class="inline-block no-underline">
			Welcome, {name}
			<Fa icon={faRightFromBracket} fw class="inline-block ml-1" />
		</a>
	{:else}
		<a href="/login" class="inline-block no-underline">
			<Fa icon={faRightToBracket} fw class="inline-block mr-1" />
			Login to view progress
		</a>
	{/if}
</div>
