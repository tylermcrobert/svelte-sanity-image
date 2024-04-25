<script lang="ts">
	import { onMount } from 'svelte';
	import getImageProps from './utils/getImageProps.js';
	import type { Props } from './utils/types.ts';

	// Pull out attributes
	let {
		alt,
		onLoad,
		image,
		client,
		quality,
		aspect,
		autoFormat,
		...props
	}: Props = $props();

	let transformedProps = getImageProps({
		client,
		image,
		quality,
		aspect,
		autoFormat
	});

	let node: HTMLImageElement;

	function handleLoad() {
		if (onLoad) onLoad({ target: node });
	}

	onMount(() => {
		const isLoaded = node.complete && node.naturalHeight !== 0;
		if (isLoaded) handleLoad();
	});
</script>

<img
	{alt}
	{...props}
	{...transformedProps}
	bind:this={node}
	onload={handleLoad}
/>
