<script lang="ts">
	import { type HTMLImgAttributes } from 'svelte/elements';
	import type { SvelteSanityImageProps } from './types.js';
	import { getImageProps } from './getImageProps.js';

	type Props = SvelteSanityImageProps & HTMLImgAttributes;

	let { image, client, aspect, srcsetSizes, ...props }: Props = $props();

	let imageProps = $derived(
		getImageProps({
			client,
			image,
			aspect,
			srcsetSizes
		})
	);
</script>

<img {...imageProps} />
