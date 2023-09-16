<script lang="ts">
	import ResponsiveImage from '$lib';

	export let data;
</script>

{#each data.images as image}
	<ResponsiveImage {image} alt="Example" sizes="100px" client={data.client} />
{/each}
