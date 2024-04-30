<script lang="ts">
	import { client } from '../sanity';
	import Image from '$lib';

	export let data;
</script>

<hr />

<div>Raw:</div>
<div class="images">
	{#each data.raw as { image, alt }}
		<Image {image} {client} {alt} sizes="100px" />
	{/each}
</div>

<hr />

<div>Refs:</div>
<div class="images">
	{#each data.refs as { image, alt }}
		<Image {image} {client} {alt} sizes="100px" />
	{/each}
</div>

<hr />

<div>Expanded:</div>
<div class="images">
	{#each data.extended as { image, alt }}
		<Image {image} {client} {alt} sizes="100px" />
	{/each}
</div>

<style>
	.images :global(img) {
		width: 100px;
		height: auto;
	}
</style>
