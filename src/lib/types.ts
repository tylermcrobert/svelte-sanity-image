import type {
	SanityClientLike,
	SanityModernClientLike,
	SanityProjectDetails,
	SanityImageSource
} from '@sanity/image-url/lib/types/types.d.ts';

/**
 * Sanity client or project details
 */

export { type SanityImageSource };

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
	aspect?: number;
	srcsetSizes?: number[];
};
