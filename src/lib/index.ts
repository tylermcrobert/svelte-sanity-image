export { default as imageUrlBuilder } from '@sanity/image-url';
export { getImageProps } from './getImageProps.js';
import Image from './SvelteSanityImage.svelte';

export type { SvelteSanityImageProps, SanityImageSource } from './types.js';

export default Image;
