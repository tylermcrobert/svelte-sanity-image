<script lang="ts">
	import type { SvelteSanityImageProps } from './utils/types';
	import { onMount } from 'svelte';
	import getImageProps from './utils/getImageProps';
	import type { HTMLImgAttributes } from 'svelte/elements';

	type Props = HTMLImgAttributes & SvelteSanityImageProps;
	type $$Props = Props;

	export let image: SvelteSanityImageProps['image'];
	export let client: SvelteSanityImageProps['client'];

	let node: HTMLImageElement;
	let loaded = false;

	let imgProps = getImageProps({
		...$$restProps,
		client,
		image
	});

	onMount(() => (loaded = node.complete && node.naturalHeight !== 0));
</script>

<img
	{...$$restProps}
	{...imgProps}
	alt={$$restProps.alt}
	style:opacity={loaded ? '' : '0'}
	bind:this={node}
	on:load={() => (loaded = true)}
/>
