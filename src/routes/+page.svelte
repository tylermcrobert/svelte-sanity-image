<script lang="ts">
	import { client } from '../sanity';
	import Image from '$lib';

	export let data;

	console.log(data);
</script>

<hr />

<h2>Raw:</h2>
<div class="images">
	{#each data.raw as { image, alt }}
		<Image image={{ image: '' }} {client} {alt} sizes="100px" />
	{/each}
</div>

<hr />

<h2>Refs:</h2>

<div class="images">
	{#each data.refs as { image, alt }}
		<Image {image} {client} {alt} sizes="100px" />
	{/each}
</div>

<hr />

<h2>Expanded:</h2>

<div class="images">
	{#each data.extended as { image, alt }}
		<Image {image} {client} {alt} sizes="100px" />
	{/each}
</div>

<hr />

<h2>Aspect Square:</h2>

<div class="images">
	{#each data.raw as { image, alt }}
		<Image {image} {client} {alt} sizes="100px" aspect={1} />
	{/each}
</div>

<hr />

<h2>Aspect landscape:</h2>

<div class="images">
	{#each data.raw as { image, alt }}
		<Image {image} {client} {alt} sizes="100px" aspect={1.5} />
	{/each}
</div>

<hr />

<h2>Aspect Portrait:</h2>

<div class="images">
	{#each data.raw as { image, alt }}
		<Image {image} {client} {alt} sizes="100px" aspect={0.8} />
	{/each}
</div>

<style>
	.images :global(img) {
		width: 100px;
		height: auto;
	}
</style>
