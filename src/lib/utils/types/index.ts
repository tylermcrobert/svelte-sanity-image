import type { SanityClient } from '@sanity/client';
import type { SanityImage } from './sanity';

/**
 * Props for the image component
 */

export type SvelteSanityImageProps = {
	image: SanityImage;
	sizes: string;
	client: SanityClient;
	alt: string;

	quality?: number;
	enforcedAspect?: number;
	onLoad?: EventCallback;
};

type EventCallbackPayload = { node: HTMLImageElement };
type EventCallback = (event: EventCallbackPayload) => void;

/**
 * Keys from props type that are
 * required for getImageProps()
 */

type GetImagePropsOptionsKeys =
	| 'image'
	| 'quality'
	| 'enforcedAspect'
	| 'client';

/**
 * Options for getImageProps()
 */

export type GetImagePropsOptions = Pick<
	SvelteSanityImageProps,
	GetImagePropsOptionsKeys
>;

/**
 * Object that is returned from getImageProps()
 */
export type GetImagePropsReturn = {
	src: string;
	srcset: string;
	style: string;
};

/**
 * Export SanityImage
 */

export { SanityImage };