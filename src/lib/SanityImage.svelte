<script lang="ts">
	import type { SvelteSanityImageProps } from './utils/types';
	import { onMount } from 'svelte';
	import getImageProps from './utils/getImageProps';
	import type { HTMLImgAttributes } from 'svelte/elements';

	type Props = HTMLImgAttributes & SvelteSanityImageProps;
	type $$Props = Props;

	export let image: SvelteSanityImageProps['image'];
	export let client: SvelteSanityImageProps['client'];
	export let onLoad: SvelteSanityImageProps['onLoad'] = () => undefined;

	let node: HTMLImageElement;

	let imgProps = getImageProps({
		...$$restProps,
		client,
		image
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
	{...$$restProps}
	{...imgProps}
	alt={$$restProps.alt}
	bind:this={node}
	on:load={handleLoad}
/>
