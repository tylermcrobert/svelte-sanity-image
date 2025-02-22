<script lang="ts">
	import type { SvelteSanityImageProps } from './../lib/types.ts';
	import { client } from '../sanity.js';
	import SvelteSanityImage from '../lib/SvelteSanityImage.svelte';
	import { TEST_IMAGE_REF_ID } from '../constants.js';

	let { data } = $props();

	const TEST_IMAGE = { _ref: TEST_IMAGE_REF_ID };

	let items: {
		title: string;
		props: Omit<SvelteSanityImageProps, 'client' | 'sizes' | 'alt' | 'image'>;
	}[] = [
		{ title: 'base', props: {} },
		{ title: 'Aspect: 0.75', props: { aspect: 0.75 } },
		{ title: 'Aspect: 1.0', props: { aspect: 1 } },
		{ title: 'Aspect: 1.5', props: { aspect: 1.5 } },
		{ title: 'Height: 1000px', props: { height: 1000 } },
		{ title: 'Width: 1000px', props: { width: 1000 } },
		{ title: 'Width: 400px, Aspect: 0.75', props: { width: 400, aspect: 0.75 } },
		{ title: 'Width: 400px, Aspect: 0.75', props: { height: 400, aspect: 0.75 } },
		{ title: 'Auto Format: true', props: { autoFormat: true } },
		{ title: 'DPR: 1', props: { dpr: 1 } },
		{ title: 'Blur: 100', props: { blur: 100 } },
		{ title: 'Saturation: -100', props: { saturation: -100 } },
		{ title: 'Sharpen: 100', props: { sharpen: 100 } },
		{ title: 'Invert: true', props: { invert: true } },
		{ title: 'Format: jpg, Quality: 10', props: { format: 'jpg', quality: 10 } },
		{ title: 'Download: true', props: { download: true } }
	];
</script>

<div class="wrapper">
	{#each items as { props, title }}
		<div>
			<h2>{title}</h2>
			<SvelteSanityImage {client} image={TEST_IMAGE} alt="test image" sizes="25vw" {...props} />
		</div>
	{/each}
</div>

<hr style="margin: 100px 0" />

<div class="wrapper">
	{#each data.images as { image, alt }}
		<SvelteSanityImage {client} {image} {alt} sizes="25vw" />
	{/each}
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		align-items: flex-start;
		gap: 8px;
	}

	.wrapper :global(img) {
		width: 100%;
		height: auto;
	}

	h2 {
		font-size: 1.2rem;
	}
</style>
