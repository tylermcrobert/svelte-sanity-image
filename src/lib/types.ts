import type {
	SanityClientLike,
	SanityModernClientLike,
	SanityProjectDetails,
	SanityImageSource,
	ImageUrlBuilderOptions
} from '@sanity/image-url/lib/types/types.d.ts';
import { VALID_BUILDER_OPTIONS } from './constants.js';
import type { HTMLImgAttributes } from 'svelte/elements';

/**
 * Sanity client or project details
 */

export { type SanityImageSource };

export type SanityClientOrProjectDetails =
	| SanityClientLike
	| SanityProjectDetails
	| SanityModernClientLike;

/**
 * The object key of the Sanity URL builder options
 */
type ValidBuilderOptionKey =
	typeof VALID_BUILDER_OPTIONS extends Readonly<Set<infer T>> ? T : never;

/**
 * Valid options that can be passed to the Sanity URL builder
 */
export type ValidBuilderOptions = {
	[key in ValidBuilderOptionKey]: ImageUrlBuilderOptions[key];
};

/**
 * Props for the image component
 */

type ValidImageProps = Omit<HTMLImgAttributes, 'src' | 'srcset'>;

export type SvelteSanityImageOptions = {
	image: SanityImageSource;
	sizes: string;
	client: SanityClientOrProjectDetails;
	aspect?: number;
	srcsetSizes?: number[];
};

export type SvelteSanityImageProps = SvelteSanityImageOptions &
	ValidImageProps &
	Partial<ValidBuilderOptions>;
