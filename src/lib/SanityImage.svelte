<script lang="ts">
	import { onMount } from 'svelte';
	import getImageProps from './utils/getImageProps';
	import { DEFAULT_QUALITY } from './utils/constants';

	import type { SvelteSanityImageProps } from './utils/types';
	import type { HTMLImgAttributes } from 'svelte/elements';

	type Props = HTMLImgAttributes & SvelteSanityImageProps;
	type $$Props = Props;

	export let client: Props['client'];
	export let image: Props['image'];
	export let alt: Props['alt'];
	export let sizes: Props['sizes'];

	export let quality: Props['quality'] = DEFAULT_QUALITY;
	export let onLoad: Props['onLoad'] = undefined;
	export let enforcedAspect: Props['enforcedAspect'] = undefined;
	export let autoFormat: Props['autoFormat'] = true;
	export let loading: Props['loading'] = 'lazy';

	let node: HTMLImageElement;

	let imgProps = getImageProps({
		client,
		image,
		quality,
		enforcedAspect,
		autoFormat
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
	{...imgProps}
	{loading}
	{alt}
	{sizes}
	bind:this={node}
	on:load={handleLoad}
/>
