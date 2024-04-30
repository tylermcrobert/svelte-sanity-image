import Image from './SvelteSanityImage.svelte';
import getImageDimensions from './utils/getImageDimensions';
import imageUrlBuilder from '@sanity/image-url';

export type {
	SanityImageObject,
	SanityImageSource,
	Props
} from './utils/types';
export { getImageDimensions, Image, imageUrlBuilder };

export default Image;
