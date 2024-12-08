<script lang="ts">
	import { type HTMLImgAttributes } from 'svelte/elements';
	import type { SvelteSanityImageProps } from './types.js';
	import { getImageProps } from './getImageProps.js';

	type Props = SvelteSanityImageProps &
		Omit<HTMLImgAttributes, 'src' | 'srcset' | 'width' | 'height'>;

	let { image, client, aspect, srcsetSizes, ...props }: Props = $props();

	let responsiveProps = $derived(
		getImageProps(image, client, {
			aspect,
			srcsetSizes
		})
	);
</script>

<img {...props} {...responsiveProps} />
