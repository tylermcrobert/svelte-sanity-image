<script lang="ts">
	import type { SvelteSanityImageProps, ValidSanityBuilderOptions } from './types.js';
	import { getImageProps } from './getImageProps.js';

	type Props = SvelteSanityImageProps;

	let {
		image,
		client,
		aspect,
		srcsetBreakpoints,
		loading,
		sizes,
		preload,
		autoFormat = true,

		// Sanity urlBuilder props
		blur,
		bg,
		dpr,
		width,
		height,
		quality,
		sharpen,
		format,
		invert,
		download,
		flipHorizontal,
		flipVertical,
		saturation,
		frame,
		...props
	}: Props = $props();

	let builderOptions: ValidSanityBuilderOptions = {
		auto: autoFormat ? 'format' : undefined,
		blur,
		bg,
		dpr,
		width,
		height,
		quality,
		sharpen,
		format,
		invert,
		download,
		flipHorizontal,
		flipVertical,
		saturation,
		frame
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
