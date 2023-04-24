<script lang="ts">
	export let text: string;
</script>

<span class="relative">
	<span class="peer">
		<slot />
	</span>
	<span
		class="opacity-0 peer-hover:opacity-100 delay-300 ease-in-out transition-opacity
	absolute -translate-y-full left-1/2 -translate-x-1/2
	dark:bg-neutral-700 bg-neutral-200 rounded-md shadow-md
	py-1 px-2 select-none min-w-max pointer-events-none"
	>
		{text}
	</span>
</span>
