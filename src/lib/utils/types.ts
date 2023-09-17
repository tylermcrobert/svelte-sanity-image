import type { SanityClient } from '@sanity/client';
import type {
	SanityImageSource,
	SanityImageObject
} from '@sanity/image-url/lib/types/types.d.ts';

/**
 * Props for the image component
 */

export type SvelteSanityImageProps = {
	image: SanityImageSource;
	sizes: string;
	client: SanityClient;
	alt: string;

	quality?: number;
	enforcedAspect?: number;
	onLoad?: EventCallback;
};

type EventCallbackPayload = { target: HTMLImageElement };
type EventCallback = (event: EventCallbackPayload) => void;

/**
 * Options for getImageProps()
 */

export type GetImagePropsOptions = {
	image: SvelteSanityImageProps['image'];
	quality: SvelteSanityImageProps['quality'];
	enforcedAspect: SvelteSanityImageProps['enforcedAspect'];
	client: SvelteSanityImageProps['client'];
};

/**
 * Object that is returned from getImageProps()
 */
export type GetImagePropsReturn = {
	src: string;
	srcset: string;
	width: number;
	height: number;
};

/**
 * Export SanityImage
 */

export { SanityImageSource, SanityImageObject };
