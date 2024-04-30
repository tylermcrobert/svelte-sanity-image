<script lang="ts">
	import { client } from '../sanity';
	import Image from '$lib';

	export let data;
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
