<script lang="ts">
	export let title: string;
	export let subtitle: string;
	export let url: string;
</script>

<a
	class="py-1 px-3 no-underline transition-colors cursor-pointer w-full inline-block text-center
		bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
	href={url}
	target="_blank"
>
	<span>{title}</span>
	<span class="text-neutral-500 text-xs">{subtitle}</span>
</a>
