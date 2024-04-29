import Image from './SvelteSanityImage.svelte';
import getImageDimensions from './utils/getImageDimensions.js';
import imageUrlBuilder from '@sanity/image-url';

export type { SanityImageObject, Props } from './utils/types.ts';
export { getImageDimensions, Image, imageUrlBuilder };

export default Image;
