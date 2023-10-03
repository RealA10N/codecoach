<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import LabeledInput from '$lib/components/LabeledInput.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { form, enhance, errors, constraints } = superForm(data.form);
</script>

<div class="flex justify-center">
	<form method="post" class="max-w-sm" use:enhance>
		<h1 class="text-center mb-6">Nice to meet! 😀</h1>

		<LabeledInput
			name="name"
			type="text"
			{...$constraints.name}
			bind:value={$form.name}
			bind:errors={$errors.name}>Name</LabeledInput
		>

		<LabeledInput
			name="email"
			type="email"
			{...$constraints.email}
			bind:value={$form.email}
			bind:errors={$errors.email}>Email</LabeledInput
		>

		<LabeledInput
			name="password"
			type="password"
			{...$constraints.password}
			bind:value={$form.password}
			bind:errors={$errors.password}>Password</LabeledInput
		>

		<LabeledInput
			name="confirm"
			type="password"
			{...$constraints.confirm}
			bind:value={$form.confirm}
			bind:errors={$errors.confirm}>Confirm Password</LabeledInput
		>

		{#if $errors._errors}
			{#each $errors._errors as error}
				<p class="text-center text-red-400 dark:text-red-700 mt-4">
					{error}
				</p>
			{/each}
		{/if}

		<div class="mt-6 text-center">
			<button
				class="bg-red-400 dark:bg-red-700 py-1 px-5 rounded-full shadow-sm text-neutral-100 inline-block w-32 focus:scale-105 transition hover:bg-red-500 hover:dark:bg-red-600"
				>Register
			</button>
		</div>

		<div class="mt-2 text-center text-sm">
			Already registered?
			<a href="/login">Log in</a>
		</div>
	</form>
</div>
