import Image from './SvelteSanityImage.svelte';
import getImageDimensions from './utils/getImageDimensions.js';

export type { SanityImageSource, Props } from './utils/types.ts';
export { getImageDimensions, Image };

export default Image;
