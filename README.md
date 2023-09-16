# svelte-sanity-image

A Svelte component that allows you to easily create responsive images from images stored in Sanity.io. Inspired by [next-sanity-image](https://github.com/lorenzodejong/next-sanity-image).

## Installation

```
npm install @tylermcrobert/svelte-sanity-image
```

## Usage

Create a GROQ query to fetch a Sanity document containing an image.

```javascript
// routes/+page.ts

import client from './sanity-client'; // Your Sanity client configuration

export async function load() {
	const imageQuery = `*[_type == 'settings'][0]{ image }`;
	const image = await client.fetch(imageQuery);

	return { image };
}
```

Supply the `SanityImage` component with the image from Sanity.

```html
<script>
	// routes/+page.svelte

	import SanityImage from '@tylermcrobert/svelte-sanity-image';
	import client from './sanity-client';

	export let data;
</script>

<SanityImage
	image="{data.image}"
	sizes="(max-width: 600px) 480px, 800px"
	alt="A beautiful dog"
	{client}
/>
```

## Props

| Property         | Type                  | Description                                                                                                                                             |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `image`          | `SanityImage`         | Accepts either a Sanity image record.                                                                                                                   |
| `alt`            | `string`              | Descriptive alt text for image accessibility.                                                                                                           |
| `sizes`          | `string`              | A responsive image size string. Read more about that in the [MDN image reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes). |
| `client`         | `SanityClient`        | A configured Sanity client.                                                                                                                             |
| `enforcedAspect` | `number \| undefined` | Enforces an aspect ratio on the image.                                                                                                                  |
| `quality`        | `number \| undefined` | Image quality. Defaults to `75`                                                                                                                         |
