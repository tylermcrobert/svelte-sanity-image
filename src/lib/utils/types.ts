import type { HTMLImgAttributes } from 'svelte/elements';
import type {
	SanityImageObject,
	SanityClientLike,
	SanityModernClientLike,
	SanityProjectDetails
} from '@sanity/image-url/lib/types/types.d.ts';

/**
 * Sanity client or project details
 */

export type SanityClientOrProjectDetails =
	| SanityClientLike
	| SanityProjectDetails
	| SanityModernClientLike;

/**
 * Props for the image component
 */

export type Props = {
	image: SanityImageObject;
	sizes: string;
	client: SanityClientOrProjectDetails;
	alt: string;

	quality?: number;
	aspect?: number;
	onLoad?: EventCallback;
	autoFormat?: boolean;
	srcsetSizes?: number[];
} & HTMLImgAttributes;

type EventCallbackPayload = { target: HTMLImageElement };
type EventCallback = (event: EventCallbackPayload) => void;

/**
 * Export SanityImage
 */

export type { SanityImageObject };
