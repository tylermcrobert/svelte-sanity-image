# svelte-sanity-image

A Svelte component that allows you to easily create responsive images from images stored in Sanity.io. Inspired by [next-sanity-image](https://github.com/lorenzodejong/next-sanity-image).

## 📦 Installation

```
npm install @tylermcrobert/svelte-sanity-image
```

## 🚀 Usage

Start by creating a GROQ query to fetch a Sanity document containing an image.

```typescript
// routes/+page.ts

import client from './sanity-client'; // Your Sanity client configuration
import type { SanityImage } from '@tylermcrobert/svelte-sanity-image'; // Optional typing

export async function load() {
  const imageQuery = `*[_type == 'settings'][0]{ image }`;
  const image: SanityImage = await client.fetch(imageQuery);

  return { image };
}
```

Next, supply the `SanityImage` component with the image from Sanity.

```html
<script>
  // routes/+page.svelte

  import SanityImage from '@tylermcrobert/svelte-sanity-image';
  import client from './sanity-client';

  export let data;
</script>

<SanityImage
  {client}
  image="{data.image}"
  sizes="(max-width: 600px) 480px, 800px"
  alt="A beautiful dog"
/>
```

This represents a basic implementation of the component.
Usage is similar to a standard `<img />` tag, but instead takes a `image` and a `client`. For more details on those and other configuration options, refer to the props table.

## ⚙️ Component Props

| Property         | Type                  | Description                                                                                                                                             |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `image`          | `SanityImage`         | Accepts either a Sanity image record.                                                                                                                   |
| `alt`            | `string`              | Descriptive alt text for image accessibility.                                                                                                           |
| `sizes`          | `string`              | A responsive image size string. Read more about that in the [MDN image reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes). |
| `client`         | `SanityClient`        | A configured Sanity client.                                                                                                                             |
| `enforcedAspect` | `number \| undefined` | Enforces an aspect ratio on the image.                                                                                                                  |
| `quality`        | `number \| undefined` | Image quality. Defaults to `75`                                                                                                                         |

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## 📜 License

Copyright ©2023 Tyler McRobert. Available under the [MIT License](https://choosealicense.com/licenses/mit/).
