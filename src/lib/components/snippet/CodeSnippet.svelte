<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';

	// Prism & Plugins
	import 'prismjs';
	import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';

	// Theme
	import 'prismjs/themes/prism-tomorrow.css';

	// Languages
	import 'prismjs/components/prism-c.js';
	import 'prismjs/components/prism-cpp.js';
	import 'prismjs/components/prism-python.js';

	export let source: string;
	export let language: string;

	export let normalizeWhiteSpaceConfig = {
		'remove-trailing': true,
		'remove-indent': true,
		'left-trim': true,
		'right-trim': true,
		'tabs-to-spaces': 4,
		'remove-initial-line-feed': true
	};

	// This stored the formatted HTML to display
	let formattedCode = '';

	onMount(() => {
		Prism.plugins.NormalizeWhitespace.setDefaults(normalizeWhiteSpaceConfig);
	});

	// Only run if Prism is defined and we code
	$: if (typeof Prism !== 'undefined' && source) {
		formattedCode = Prism.highlight(
			source,
			Prism.languages[language],
			language
		);
	}
</script>

<pre {...$$restProps} class="max-w-2xl overflow-x-clip"><code
		class="language-{language}">{@html formattedCode}</code
	></pre>
