<script lang="ts">
	import type { SvelteSanityImageProps, ValidBuilderOptions } from './types.js';
	import { getImageProps } from './getImageProps.js';

	type Props = SvelteSanityImageProps;

	let {
		image,
		client,
		aspect,
		srcsetSizes,
		height,
		width,
		quality,
		blur,
		format,
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
			srcsetSizes,
			...builderOptions
		})
	);
</script>

<img {...props} {...generatedProps} />
