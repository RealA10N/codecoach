<!-- Inspired by https://svelte.dev/examples/modal -->

<script lang="ts">
	import Fa from 'svelte-fa';
	import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
	import { fly } from 'svelte/transition';

	export let showModel: boolean;
	let dialog: HTMLDialogElement;
	$: if (dialog && showModel) dialog.showModal();
</script>

<dialog
	bind:this={dialog}
	on:close={() => (showModel = false)}
	on:click|self={() => dialog.close()}
	transition:fly={{ y: 50 }}
	class="bg-neutral-200 dark:bg-neutral-800 shadow-lg absolute m-auto w-full max-w-xl
		backdrop:backdrop-blur-[2px] backdrop:bg-black backdrop:bg-opacity-50
		open:animate-pop-in"
	{...$$restProps}
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click|stopPropagation class="px-4 py-2">
		<slot />
		<button
			class="absolute right-0 top-0 p-1 m-2 text-neutral-500"
			on:click={() => dialog.close()}
		>
			<Fa icon={faCircleXmark} />
		</button>
	</div>
</dialog>
