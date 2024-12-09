<script lang="ts">
	import type { SvelteSanityImageProps } from './types.js';
	import { getImageProps } from './getImageProps.js';

	type Props = SvelteSanityImageProps;

	let { image, client, aspect, srcsetSizes, height, width, ...props }: Props = $props();

	let responsiveProps = $derived(
		getImageProps(image, client, {
			aspect,
			srcsetSizes,
			height,
			width
		})
	);
</script>

<img {...props} {...responsiveProps} />
