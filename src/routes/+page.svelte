<script>
	import ResponsiveImage from '$lib/ResponsiveImage.svelte';

	export let data;
</script>

Images:
<ul>
	{#each data.images as image}
		<li>
			<ResponsiveImage
				{image}
				alt="Example"
				sizes="100px"
				client={data.client}
			/>
		</li>
	{/each}
</ul>

<style>
	:global(img) {
		width: 100px;
	}
</style>
