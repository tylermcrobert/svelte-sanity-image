import type { HTMLImgAttributes } from 'svelte/elements';
import type {
	SanityClientLike,
	SanityModernClientLike,
	SanityProjectDetails,
	SanityImageSource
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

export type SvelteSanityImageProps = {
	image: SanityImageSource;
	sizes: string;
	client: SanityClientOrProjectDetails;
	alt: string | null;

	quality?: number;
	aspect?: number;
	onLoad?: EventCallback;
	autoFormat?: boolean;
	srcsetSizes?: number[];
} & HTMLImgAttributes;

type EventCallbackPayload = { target: HTMLImageElement };
type EventCallback = (event: EventCallbackPayload) => void;
