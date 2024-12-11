# svelte-sanity-image

A Svelte component that allows you to easily create responsive images from images stored in Sanity.io. This is powered by the [Sanity Image Builder](https://www.sanity.io/docs/image-url) under the hood. Inspired by packages like [next/image](https://nextjs.org/docs/pages/api-reference/components/image) and [next-sanity-image](https://github.com/lorenzodejong/next-sanity-image).

See the demo [here](https://svelte-sanity-image.netlify.app/)

### Features of this package:

- Automatically sets the width and height of the image to prevent layout shifts
- Automatically creates an `srcset` attribute to allow for responsive images.
- Allows for defining a custom aspect ratio.
- Extends the standard `<img />` element, allowing for all native attributes except for `src` and `srcset`.
- Allows for image preloading in `svelte:head` with the `priority` prop.
- Fully typed & unit tested.

## 📦&ensp;Installation

```
npm install @tylermcrobert/svelte-sanity-image
```

## 🚀&ensp;Usage

To use the component, simply supply the `SanityImage` component with the image from Sanity along with your configured sanity client. It is reccommended to create a wrapper component in your project to avoid having to supply the client on each use.

```svelte
<SanityImage
	{client}
	{image}
	sizes="(max-width: 768px) 50vw, 100vw"
	alt="The Beatles crossing Abbey Road in London."
/>
```

This component extends the standard `<img />` component so any properties or events are usable here as well.

## ⚙️&ensp; Component Props

| Property            | Type           | Description                                                                                                                                                                                 | Required |
| ------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `client`            | Object         | A configured Sanity client.                                                                                                                                                                 | Yes      |
| `image`             | Object         | Image data returned from sanity API.                                                                                                                                                        | Yes      |
| `alt`               | String         | Descriptive alt text for image accessibility.                                                                                                                                               | Yes      |
| `sizes`             | String \| null | A responsive image size string. Read more about that in the [MDN image reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes). Set to null to bypass responsivity. | Yes      |
| `aspect`            | Number         | Enforces an aspect ratio on the image.                                                                                                                                                      | –        |
| `preload`           | Boolean        | Adds a `<link rel="preload" />` to the head of the page                                                                                                                                     | –        |
| `srcsetBreakpoints` | string[]       | Overrides the breakpoints that make up the `srcset` string. Defaults to `640, 750, 828, 1080, 1200, 1920, 2048, 3840`                                                                       | –        |

## Optimizations

| Property  | value  | Description                                                |
| --------- | ------ | ---------------------------------------------------------- |
| `loading` | `lazy` | Defers loading of the image until it is near the viewport. |

## 🤝&ensp;Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## 📜&ensp;License

Copyright ©2023 Tyler McRobert. Available under the [MIT License](https://choosealicense.com/licenses/mit/).
