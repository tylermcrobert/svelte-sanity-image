export { createImageUrlBuilder } from '@sanity/image-url';
export { getImageProps } from './getImageProps.js';
export { getImageDimensions } from './getImageDimensions.js';
import Image from './SvelteSanityImage.svelte';

export type * from './types.js';

export default Image;

/**
 * @deprecated Use `createImageUrlBuilder` instead. This export will be removed in the next major version.
 */
export { default as imageUrlBuilder } from '@sanity/image-url';
