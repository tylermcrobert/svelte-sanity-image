# svelte-sanity-image

:warning: Warning: This package is under development and very likely introduce breaking changes.

A Svelte component that allows you to easily create responsive images from images stored in Sanity.io. Inspired by [next-sanity-image](https://github.com/lorenzodejong/next-sanity-image).

## 📦&ensp;Installation

```
npm install @tylermcrobert/svelte-sanity-image
```

## 🚀&ensp;Usage

Start by creating a GROQ query to fetch a Sanity document containing an image.

<p><code>routes/+page.ts</code></p>

```typescript
import client from './sanity-client'; // Your Sanity client configuration
import type { SanityImage } from '@tylermcrobert/svelte-sanity-image'; // Optional typing

export async function load() {
  const imageQuery = `*[_type == 'settings'][0]{ image }`;
  const image: SanityImage = await client.fetch(imageQuery);

  return { image };
}
```

Next, supply the `SanityImage` component with the image from Sanity.

<p><code>routes/+page.ts</code></p>

```svelte
<script>
  import SanityImage from '@tylermcrobert/svelte-sanity-image';
  import client from './sanity-client';

  export let data;
</script>

<SanityImage
  {client}
  image={data.image}
  sizes="(max-width: 600px) 480px, 800px"
  alt="The Beatles crossing Abbey Road in London."
/>
```

This represents a basic implementation of the component.
Usage is similar to a standard `<img />` tag, but instead takes a `image` and a `client`. For more details on those and other configuration options, refer to the props table.

## ⚙️&ensp;Component Props

| Property         | Type           | Description                                                                                                                                             | Required |
| ---------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `client`         | Object         | A configured Sanity client.                                                                                                                             | Yes      |
| `image`          | Object         | Image data returned from sanity API.                                                                                                                    | Yes      |
| `alt`            | String         | Descriptive alt text for image accessibility.                                                                                                           | Yes      |
| `sizes`          | String         | A responsive image size string. Read more about that in the [MDN image reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes). | Yes      |
| `quality`        | Number         | Image quality. Defaults to `75`                                                                                                                         | –        |
| `loading`        | String \| null | Set the browser’s native lazy loading attribute. Available options are `"lazy"`, `"eager"`, or `null`. Defaults to `"lazy"`.                            | —        |
| `autoFormat`     | Boolean        | Uses webp format if browser supports it. Defaults to `true`                                                                                             | —        |
| `enforcedAspect` | Number         | Enforces an aspect ratio on the image.                                                                                                                  | –        |
| `onLoad`         | Function       | Runs on image load and provides an event object                                                                                                         | —        |

## 🤝&ensp;Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## 📜&ensp;License

Copyright ©2023 Tyler McRobert. Available under the [MIT License](https://choosealicense.com/licenses/mit/).
