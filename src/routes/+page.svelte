<script lang="ts">
	import SanityImage from '$lib';

	export let data;
</script>

{#each data.images as image}
	<SanityImage
		{image}
		alt="Example"
		sizes="100px"
		client={data.client}
		loading="lazy"
	/>
{/each}
