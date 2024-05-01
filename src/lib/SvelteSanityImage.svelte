<script lang="ts">
	import { onMount } from 'svelte';
	import getImageProps from './utils/getImageProps.js';
	import type { SvelteSanityImageProps } from './utils/types.ts';

	// Pull out attributes
	let {
		alt,
		onLoad,
		image,
		client,
		quality,
		aspect,
		srcsetSizes,
		autoFormat = true,
		loading = 'lazy',
		...props
	}: SvelteSanityImageProps = $props();

	let node = $state<HTMLImageElement>();
	let isPriority = $derived(props.fetchpriority === 'high');

	/**
	 * Generates transformed image properties based on the provided parameters.
	 */
	let transformedProps = $derived(
		getImageProps({
			client,
			image,
			quality,
			aspect,
			autoFormat,
			srcsetSizes
		})
	);

	function handleLoad(node: HTMLImageElement) {
		if (onLoad) onLoad({ target: node });
	}

	onMount(() => {
		if (node) {
			const isLoaded = node.complete && node.naturalHeight !== 0;
			if (isLoaded) handleLoad(node);
		} else {
			console.error('Image node not found');
		}
	});
</script>

<svelte:head>
	{#if isPriority}
		<link
			rel="preload"
			as="image"
			imagesrcset={transformedProps.srcset}
			imagesizes={props.sizes}
			fetchpriority="high"
		/>
	{/if}
</svelte:head>

<img
	{alt}
	{...props}
	{...transformedProps}
	loading={isPriority ? 'eager' : loading}
	bind:this={node}
	onload={(e) => handleLoad(e.currentTarget as HTMLImageElement)}
/>
