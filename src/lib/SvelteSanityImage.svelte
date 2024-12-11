<script lang="ts">
	import type { SvelteSanityImageProps, ValidBuilderOptions } from './types.js';
	import { getImageProps } from './getImageProps.js';

	type Props = SvelteSanityImageProps;

	let {
		image,
		client,
		aspect,
		srcsetBreakpoints,
		height,
		width,
		quality,
		blur,
		format,
		preload,
		sizes,
		loading,
		...props
	}: Props = $props();

	let builderOptions: ValidBuilderOptions = {
		quality,
		width,
		height,
		blur,
		format
	};

	let generatedProps = $derived(
		getImageProps(image, client, {
			aspect,
			srcsetBreakpoints,
			...builderOptions
		})
	);
</script>

<svelte:head>
	{#if preload}
		<link
			rel="preload"
			as="image"
			href={generatedProps.src}
			imagesrcset={generatedProps.srcset}
			imagesizes={sizes}
			fetchpriority="high"
		/>
	{/if}
</svelte:head>

<img
	{...props}
	{...generatedProps}
	{sizes}
	loading={preload ? 'eager' : loading || 'lazy'}
	srcset={sizes !== null ? generatedProps.srcset : undefined}
/>
