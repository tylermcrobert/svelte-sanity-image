<script lang="ts">
	import type {
		EnforcedAspect,
		Quality,
		SanityImage,
		Sizes
	} from './utils/types';
	import { onMount } from 'svelte';
	import getImageProps from './utils/getImageProps';
	import type { SanityClient } from '@sanity/client';

	export let image: SanityImage;
	export let alt: string;
	export let sizes: Sizes;
	export let client: SanityClient;

	export let enforcedAspect: EnforcedAspect = undefined;
	export let quality: Quality = undefined;

	let node: HTMLImageElement;
	let loaded = false;

	$: imgProps = getImageProps({
		client,
		image,
		quality,
		enforcedAspect,
		sizes
	});

	onMount(() => (loaded = node.complete && node.naturalHeight !== 0));
</script>

<img
	{...imgProps}
	{alt}
	style:opacity={loaded ? '' : '0'}
	bind:this={node}
	on:load={() => (loaded = true)}
/>
