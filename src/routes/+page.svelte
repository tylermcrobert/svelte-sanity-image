<script>
	export let data;
</script>

Images:
<ul>
	{#each data.images as image}
		<li>image goes here: <code>{image.asset._ref}</code></li>
	{/each}
</ul>
