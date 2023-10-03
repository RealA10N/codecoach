<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import LabeledInput from '$lib/components/LabeledInput.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { form, enhance, errors, message } = superForm(data.form);
</script>

<div class="flex justify-center">
	<form method="post" class="max-w-sm" use:enhance>
		<h1 class="text-center mb-6">Nice to meet! 😀</h1>

		<LabeledInput
			required
			name="name"
			type="text"
			bind:value={$form.name}
			bind:errors={$errors.name}>Name</LabeledInput
		>

		<LabeledInput
			required
			name="email"
			type="email"
			bind:value={$form.email}
			bind:errors={$errors.email}>Email</LabeledInput
		>

		<LabeledInput
			required
			name="password"
			type="password"
			bind:value={$form.password}
			bind:errors={$errors.password}>Password</LabeledInput
		>

		<LabeledInput
			required
			name="confirm"
			type="password"
			bind:value={$form.confirm}
			bind:errors={$errors.confirm}>Confirm Password</LabeledInput
		>

		{#if $message}
			<p class="text-center text-red-400 dark:text-red-700 mt-4">
				{$message}
			</p>
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
