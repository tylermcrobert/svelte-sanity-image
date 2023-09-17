<script lang="ts">
	import type { SvelteSanityImageProps } from './utils/types';
	import { onMount } from 'svelte';
	import getImageProps from './utils/getImageProps';
	import type { HTMLImgAttributes } from 'svelte/elements';

	type Props = HTMLImgAttributes & SvelteSanityImageProps;
	type $$Props = Props;

	export let client: Props['client'];
	export let image: Props['image'];
	export let alt: Props['alt'];
	export let sizes: Props['sizes'];

	export let quality: Props['quality'] = undefined;
	export let onLoad: Props['onLoad'] = undefined;
	export let enforcedAspect: Props['enforcedAspect'] = undefined;

	let node: HTMLImageElement;

	let imgProps = getImageProps({
		client,
		image,
		quality,
		enforcedAspect
	});

	function handleLoad() {
		if (onLoad) onLoad({ target: node });
	}

	onMount(() => {
		const isLoaded = node.complete && node.naturalHeight !== 0;
		if (isLoaded) handleLoad();
	});
</script>

<img {...imgProps} {alt} {sizes} bind:this={node} on:load={handleLoad} />
