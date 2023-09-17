<script lang="ts">
	import SanityImage from '$lib';
	import type { SanityImageSource } from '$lib';
	import type { SanityClient } from '@sanity/client';

	export let data: { client: SanityClient; images: SanityImageSource[] };
</script>

<div class="images">
	{#each data.images as image}
		<SanityImage
			{image}
			alt="Example"
			loading="lazy"
			sizes="100px"
			client={data.client}
		/>
	{/each}
</div>

<style>
	.images :global(img) {
		width: 100px;
		height: auto;
	}
</style>
