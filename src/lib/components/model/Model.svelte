<!-- Inspired by https://svelte.dev/examples/modal -->

<script lang="ts">
	import Fa from 'svelte-fa';
	import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

	export let showModel: boolean;
	let dialog: HTMLDialogElement;
	$: if (dialog && showModel) dialog.showModal();
</script>

<dialog
	bind:this={dialog}
	on:close={() => (showModel = false)}
	on:click|self={() => dialog.close()}
	class="bg-neutral-800 shadow-sm m-4 w-100 fixed max-h-[75vh]
			top-1/2 left-1/2 box-border -translate-x-1/2 -translate-y-1/2
			backdrop:backdrop-blur-[2px] backdrop:bg-black backdrop:bg-opacity-50
			open:animate-pop-in text-neutral-200"
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
