<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="flex justify-center">
	<form method="post" class="max-w-sm" use:enhance>
		<h1 class="text-center mb-6">Welcome back! 👋</h1>

		<label for="email">Email</label>
		<input type="email" name="email" id="email" required />

		<label for="password">Password</label>
		<input type="password" name="password" id="password" required />

		{#if form?.error}
			<p class="text-center text-red-400 dark:text-red-700 mt-4">
				{form.error}
			</p>
		{/if}

		<div class="mt-6 text-center">
			<button
				class="bg-red-400 dark:bg-red-700 py-1 px-5 rounded-full shadow-sm text-neutral-100 inline-block w-32 focus:scale-105 transition hover:bg-red-500 hover:dark:bg-red-600"
				>Login
			</button>
		</div>

		<div class="mt-2 text-center text-sm">
			First time?
			<a href="/register">Register here</a>
		</div>
	</form>
</div>
