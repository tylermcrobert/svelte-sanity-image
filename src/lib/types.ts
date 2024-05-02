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

type SanityClientOrProjectDetails =
	| SanityClientLike
	| SanityProjectDetails
	| SanityModernClientLike;

type EventCallback = (event: { target: HTMLImageElement }) => void;

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
