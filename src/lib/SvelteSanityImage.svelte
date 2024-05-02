<script lang="ts">
	import { onMount } from 'svelte';
	import { getImageProps } from './getImageProps';
	import type { SvelteSanityImageProps as Props } from './types';

	type $$Props = Props;

	export let image: Props['image'];
	export let alt: Props['alt'];
	export let client: Props['client'];
	export let sizes: Props['sizes'];
	export let quality: Props['quality'] = undefined;
	export let aspect: Props['aspect'] = undefined;
	export let autoFormat: Props['autoFormat'] = true;
	export let srcsetSizes: Props['srcsetSizes'] = undefined;
	export let onLoad: Props['onLoad'] = undefined;
	export let loading: Props['loading'] = 'lazy';
	export let fetchpriority: Props['fetchpriority'] = undefined;

	let node: HTMLImageElement;

	$: isPriority = fetchpriority === 'high';

	/**
	 * Generates transformed image properties
	 * based on the provided parameters.
	 */
	$: transformedProps = getImageProps({
		client,
		image,
		quality,
		aspect,
		autoFormat,
		srcsetSizes
	});

	function handleLoad() {
		if (onLoad) onLoad({ target: node });
	}

	onMount(() => {
		const isLoaded = node.complete && node.naturalHeight !== 0;
		if (isLoaded) handleLoad();
	});
</script>

<svelte:head>
	{#if isPriority}
		<link
			rel="preload"
			as="image"
			imagesrcset={transformedProps.srcset}
			imagesizes={sizes}
			fetchpriority="high"
		/>
	{/if}
</svelte:head>

<img
	{...$$restProps}
	{...transformedProps}
	{alt}
	{sizes}
	{fetchpriority}
	loading={isPriority ? 'eager' : loading}
	bind:this={node}
	on:load={handleLoad}
/>
