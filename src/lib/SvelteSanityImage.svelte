<script lang="ts">
	import { onMount } from 'svelte';
	import { getImageProps } from './getImageProps';
	import type { SvelteSanityImageProps } from './types';

	type $$Props = SvelteSanityImageProps;

	/**
	 * Pull out attributes that are specific to this component
	 */
	const {
		alt,
		onLoad,
		image,
		client,
		quality,
		aspect,
		srcsetSizes,
		autoFormat = true,
		loading = 'lazy',

		/**
		 * The rest are native img attrs
		 */
		...incomingProps
	} = $$restProps as $$Props;

	let node: HTMLImageElement;

	$: isPriority = incomingProps.fetchpriority === 'high';

	/**
	 * Generates transformed image properties based on the provided parameters.
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
			imagesizes={incomingProps.sizes}
			fetchpriority="high"
		/>
	{/if}
</svelte:head>

<img
	{...incomingProps}
	{...transformedProps}
	{alt}
	loading={isPriority ? 'eager' : loading}
	bind:this={node}
	on:load={handleLoad}
/>
