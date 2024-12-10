<script lang="ts">
	import { client } from '../sanity.js';
	import SvelteSanityImage from '../lib/SvelteSanityImage.svelte';
	import { TEST_IMAGE_REF_ID } from '../constants.js';

	let { data } = $props();

	const TEST_IMAGE = { _ref: TEST_IMAGE_REF_ID };
</script>

<div class="wrapper">
	<div>
		<h2>Base</h2>
		<SvelteSanityImage {client} image={TEST_IMAGE} sizes="25vw" />
	</div>
	<div>
		<h2>Aspect: 0.75</h2>
		<SvelteSanityImage {client} image={TEST_IMAGE} aspect={0.75} sizes="25vw" />
	</div>
	<div>
		<h2>Aspect: 1</h2>
		<SvelteSanityImage {client} image={TEST_IMAGE} aspect={1} sizes="25vw" />
	</div>
	<div>
		<h2>Aspect: 1.25</h2>
		<SvelteSanityImage {client} image={TEST_IMAGE} aspect={1.25} sizes="25vw" />
	</div>
	<div>
		<h2>Height: 1000</h2>
		<SvelteSanityImage {client} image={'TEST_IMAGE'} height={1000} sizes="25vw" />
	</div>
	<div>
		<h2>Width: 1000</h2>
		<SvelteSanityImage {client} image={TEST_IMAGE} width={1000} sizes="25vw" />
	</div>
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
