<script lang="ts">
	export let errors: string[] | undefined;
	export let value: string;
</script>

<div class="mt-2">
	<label for="input"><slot /></label>
	<input
		{...$$props}
		id="input"
		aria-invalid={errors ? 'true' : undefined}
		bind:value
	/>

	{#each errors ?? [] as error}
		<small class="text-red-500 opacity-75">
			{error}
		</small>
	{/each}
</div>
