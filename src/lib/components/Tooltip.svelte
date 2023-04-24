<script lang="ts">
	export let text: string;
</script>

<span class="relative">
	<span class="peer">
		<slot />
	</span>
	<span
		class="opacity-0 peer-hover:opacity-100 delay-300 ease-in-out transition-all
	absolute -translate-y-3/4 peer-hover:-translate-y-full left-1/2 -translate-x-1/2
	scale-75 peer-hover:scale-100 py-1 px-2 select-none min-w-max pointer-events-none
	dark:bg-neutral-700 bg-neutral-200 rounded-md shadow-md"
	>
		{text}
	</span>
</span>
