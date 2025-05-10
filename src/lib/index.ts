export { default as imageUrlBuilder } from '@sanity/image-url';
export { getImageProps } from './getImageProps.js';
export { getImageDimensions } from './getImageDimensions.js';
import Image from './SvelteSanityImage.svelte';

export type { SvelteSanityImageProps, SanityImageSource } from './types.js';

export default Image;
