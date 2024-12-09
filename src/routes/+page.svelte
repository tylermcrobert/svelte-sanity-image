<script lang="ts">
	import { client } from '../sanity.js';
	import SvelteSanityImage from '../lib/SvelteSanityImage.svelte';

	let { data } = $props();

	const TEST_IMAGE = { _ref: 'image-baa6daf0bffc612ad17f5fdd9dd1d0f2ad2f5059-1200x800-png' };
</script>

<div class="wrapper">
	<SvelteSanityImage {client} image={TEST_IMAGE} sizes="25vw" />
	<SvelteSanityImage {client} image={TEST_IMAGE} aspect={0.75} sizes="25vw" />
	<SvelteSanityImage {client} image={TEST_IMAGE} aspect={1} sizes="25vw" />
	<SvelteSanityImage {client} image={TEST_IMAGE} aspect={1.25} sizes="25vw" />
	<SvelteSanityImage {client} image={TEST_IMAGE} height={1000} sizes="25vw" />
</div>

<hr style="margin: 100px 0" />

<div class="wrapper">
	{#each data.images as { image, alt }}
		<SvelteSanityImage {client} {image} {alt} aspect={1} sizes="25vw" />
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
</style>
