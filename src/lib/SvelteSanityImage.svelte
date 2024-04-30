<script lang="ts">
	import { onMount } from 'svelte';
	import getImageProps from './utils/getImageProps';
	import type { Props } from './utils/types';

	type $$Props = Props;

	// Pull out attributes
	const {
		alt,
		onLoad,
		image,
		client,
		quality,
		aspect,
		autoFormat,
		srcsetSizes,

		// The rest are native img attrs
		...incomingProps
	} = $$restProps as $$Props;

	let transformedProps = getImageProps({
		client,
		image,
		quality,
		aspect,
		autoFormat,
		srcsetSizes
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
	{...incomingProps}
	{...transformedProps}
	bind:this={node}
	on:load={handleLoad}
/>
