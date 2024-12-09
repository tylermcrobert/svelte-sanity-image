<script lang="ts">
	import { client } from '../sanity.js';
	import SvelteSanityImage from '../lib/SvelteSanityImage.svelte';

	let { data } = $props();
</script>

<div class="wrapper">
	{#each data.images as { image, alt }}
		<SvelteSanityImage {client} {image} {alt} sizes="100vw" width={900} height={500} />
	{/each}
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		align-items: flex-start;
	}

	.wrapper :global(img) {
		width: 100%;
		height: auto;
	}
</style>
