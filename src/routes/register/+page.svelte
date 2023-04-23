<script lang="ts">
	import { enhance } from '$app/forms';
	import LabeledInput from '$lib/components/LabeledInput.svelte';
	import Tooltip from '$src/lib/components/Tooltip.svelte';
	import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
	import type { ActionData } from './$types';
	import Fa from 'svelte-fa';

	export let form: ActionData;
</script>

<div class="flex justify-center">
	<form method="post" class="max-w-sm" use:enhance>
		<h1 class="text-center mb-6">Nice to meet! 😀</h1>

		<LabeledInput type="text" name="name">Name</LabeledInput>
		<LabeledInput type="email" name="email">Email</LabeledInput>
		<LabeledInput type="password" name="password">Password</LabeledInput>
		<LabeledInput type="text" name="codeforces">Codeforces Handle</LabeledInput>
		<LabeledInput type="text" name="cses"
			>CSES User Number <span class="inline-block text-sm ml-1"
				><Tooltip text="Go to your profile and copy from URL path"
					><Fa icon={faCircleInfo} /></Tooltip
				></span
			></LabeledInput
		>

		{#if form?.error}
			<p class="text-center text-red-400 dark:text-red-700 mt-4">
				{form.error}
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
