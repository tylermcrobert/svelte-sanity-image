<script lang="ts">
	import SanityImage from '$lib';

	export let data;
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
