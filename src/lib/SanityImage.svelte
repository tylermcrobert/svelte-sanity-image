<script lang="ts">
	import { onMount } from 'svelte';
	import getImageProps from './utils/getImageProps';
	import type { SvelteSanityImageProps } from './utils/types';
	import type { HTMLImgAttributes } from 'svelte/elements';

	type $$Props = HTMLImgAttributes & SvelteSanityImageProps;
	const { alt, onLoad, ...incomingProps } = $$restProps as $$Props;

	let node: HTMLImageElement;

	let transformedProps = getImageProps({
		client: incomingProps.client,
		image: incomingProps.image,
		quality: incomingProps.quality,
		enforcedAspect: incomingProps.enforcedAspect,
		autoFormat: incomingProps.autoFormat
	});

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
