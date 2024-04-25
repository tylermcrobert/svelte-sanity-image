<script lang="ts">
	import { client, type ImagesQuery } from '../sanity.js';
	import Image from '$lib/SvelteSanityImage.svelte';

	export let data: { images: ImagesQuery };
</script>

<div class="images">
	{#each data.images as { image, alt }}
		<Image {image} {client} {alt} sizes="100px" />
	{/each}
</div>

<style>
	.images :global(img) {
		width: 100px;
		height: auto;
	}
</style>
