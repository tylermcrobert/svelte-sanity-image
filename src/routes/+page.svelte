<script lang="ts">
	import { client, type ImagesQuery } from '../sanity';
	import SanityImage from '$lib';

	export let data: { images: ImagesQuery };
</script>

<div class="images">
	{#each data.images as { image, alt }}
		<SanityImage {image} {client} {alt} sizes="100px" />
	{/each}
</div>

<style>
	.images :global(img) {
		width: 100px;
		height: auto;
	}
</style>
