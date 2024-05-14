import Image from './SvelteSanityImage.svelte';

export type * from '@sanity/image-url/lib/types/types.d.ts';
export { default as imageUrlBuilder } from '@sanity/image-url';

export type { SvelteSanityImageProps } from './types';
export { getImageProps } from './getImageProps';
export {
	getReferenceId,
	getDimsFromRefString,
	getImageDimensions
} from './getImageDimensions';

export default Image;
