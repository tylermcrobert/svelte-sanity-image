# svelte-sanity-image

A Svelte component for creating responsive, optimized images from Sanity.io. Powered by the [Sanity Image Builder](https://www.sanity.io/docs/image-url) under the hood, it simplifies responsive image handling and layout shift prevention in your Svelte projects.

**Demo:** [svelte-sanity-image.netlify.app](https://svelte-sanity-image.netlify.app/)

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

## ⚙️ Component Props

| Property            | Type           | Description                                                                                                                                                | Required |
| ------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `client`            | Object         | A configured Sanity client.                                                                                                                                | Yes      |
| `image`             | Object         | Image data returned from Sanity API.                                                                                                                       | Yes      |
| `alt`               | String         | Descriptive alt text for accessibility.                                                                                                                    | Yes      |
| `sizes`             | String \| null | A responsive image size string ([MDN reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes)). Set to null to bypass responsivity. | Yes      |
| `aspect`            | Number         | Enforces an aspect ratio on the image.                                                                                                                     | –        |
| `preload`           | Boolean        | Adds a `<link rel="preload" />` in `<svelte:head>` for prioritized loading.                                                                                | –        |
| `srcsetBreakpoints` | string[]       | Overrides the default breakpoints for `srcset`. Defaults to `640, 750, 828, 1080, 1200, 1920, 2048, 3840`.                                                 | –        |

## 🔧 Usage

This component extends the standard `<img />` element, so you can use any native attributes or events like `loading="lazy"` and `onload`.

### Example with All Props

```svelte
<SanityImage
	{client}
	{image}
	sizes="(max-width: 768px) 50vw, 100vw"
	alt="The Beatles crossing Abbey Road in London."
	aspect={16 / 9}
	preload
	srcsetBreakpoints={[320, 480, 1024]}
/>
```

## 🛠 Optimizations

| Property  | Value  | Description                                                                   |
| --------- | ------ | ----------------------------------------------------------------------------- |
| `loading` | `lazy` | Defers loading of images until they are near the viewport (default behavior). |

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## 📜 License

MIT License © 2024 Tyler McRobert
