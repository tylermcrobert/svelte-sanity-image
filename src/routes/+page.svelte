<script lang="ts">
	import SanityImage from '$lib';

	export let data;
</script>

<div class="images">
	{#each data.images as image}
		<div class="imgWrap">
			<SanityImage
				{image}
				alt="Example"
				sizes="100px"
				client={data.client}
				loading="lazy"
				onLoad={(e) => {
					e.target.style.opacity = '1';
				}}
			/>
		</div>
	{/each}
</div>

<style>
	.imgWrap {
		background: #eaeaea;
		display: inline-block;
		margin: 1rem;
	}

	.images :global(img) {
		width: 100px;
		opacity: 0;
		transition: 1000ms ease opacity;
	}
</style>
