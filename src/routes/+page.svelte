<script lang="ts">
	import ResponsiveImage from '$lib';

	export let data;
</script>

{#each data.images as image}
	<li>
		<ResponsiveImage {image} alt="Example" sizes="100px" client={data.client} />
	</li>
{/each}

<style>
	:global(img) {
		width: 100px;
	}
</style>
