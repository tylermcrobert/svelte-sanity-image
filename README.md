# create-svelte

A Svelte component for creating responsive, optimized images from Sanity.io. Powered by the [Sanity Image Builder](https://www.sanity.io/docs/image-url) under the hood, it simplifies responsive image handling and layout shift prevention in your Svelte projects.

<!-- **Demo:** [svelte-sanity-image.netlify.app](https://svelte-sanity-image.netlify.app/) -->

## ✨ Features

- Prevents layout shifts by setting image dimensions automatically.
- Creates `srcset` attributes for responsive images out of the box.
- Supports custom aspect ratios.
- Provides control of native `<img />` attributes.
- Available preloading of images with the `preload` prop.
- Fully typed with TypeScript support and unit-tested for reliability.

## 📦 Installation

Install the package via npm:

```bash
npm install @tylermcrobert/svelte-sanity-image
```

## 🚀 Quick Start

A minimal example of using `svelte-sanity-image`:

```svelte
<SanityImage
	{client}
	{image}
	sizes="(max-width: 768px) 50vw, 100vw"
	alt="The Beatles crossing Abbey Road in London."
/>
```

This component extends the standard `<img />` element, so you can use any native attributes or events.

An example creating a wrapper component:

```svelte
<script lang="ts">
	import { client } from '$lib/sanity';
	import Image, { type SvelteSanityImageProps } from '@tylermcrobert/svelte-sanity-image';

	type ImageProps = Omit<SvelteSanityImageProps, 'client'> & {
		aboveTheFold: boolean;
	};

	let { aboveTheFold, ...props }: ImageProps = $props();
</script>

<Image
	{...props}
	{client}
	quality={80}
	loading={aboveTheFold ? 'eager' : 'lazy'}
	fetchpriority={aboveTheFold ? 'high' : undefined}
/>
```

An example using getImageProps:

```svelte
<script lang="ts">
	import { client } from '$lib/sanity';
	import Image, { type getImageProps } from '@tylermcrobert/svelte-sanity-image';

	type ImageProps = { image: SanityImageSource };

	let { image }: ImageProps = $props();

	let imageProps = $derived(getImageProps(client, image, { quality: 80 }));
</script>

<img {...imageProps} />
```

## ⚙️ Component Props

| Property            | Type           | Description                                                                                                                                                | Required |
| ------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `client`            | Object         | A configured Sanity client or project details.                                                                                                             | Yes      |
| `image`             | Object         | Image data returned from Sanity API.                                                                                                                       | Yes      |
| `alt`               | String         | Descriptive alt text for accessibility.                                                                                                                    | Yes      |
| `sizes`             | String \| null | A responsive image size string ([MDN reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes)). Set to null to bypass responsivity. | Yes      |
| `aspect`            | Number         | Enforces an aspect ratio on the image.                                                                                                                     | –        |
| `preload`           | Boolean        | Adds a `<link rel="preload" />` in `<svelte:head>` for prioritized loading.                                                                                | –        |
| `srcsetBreakpoints` | string[]       | Overrides the default breakpoints for `srcset`. Defaults to `640, 750, 828, 1080, 1200, 1920, 2048, 3840`.                                                 | –        |

### Optimization Defaults

This package makes similar default optimizations as [Next/Image](https://nextjs.org/docs/app/api-reference/components/image).

| Property     | Value  | Description                                                                                                             |
| ------------ | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| `loading`    | `lazy` | Defers loading of images until they are near the viewport.                                                              |
| `autoFormat` | `true` | Automatically return an image in the most optimized format supported by the browser as determined by its Accept header. |
| `quality`    | `75`   | Set automatically to 75 by Sanity`s internal image transformations                                                      |

### Supported Sanity transformations:

`svelte-sanity-image` supports the following [Image Transformations](https://www.sanity.io/docs/image-urls):

`blur`, `bg`, `dpr`, `width`, `height`, `quality`, `sharpen`, `format`, `invert`, `download`, `flipHorizontal`, `flipVertical`, `saturation`, and `frame`.

## 🤝 Contributing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

## 📜 License

MIT License © 2024 Tyler McRobert
