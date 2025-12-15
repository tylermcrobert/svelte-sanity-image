import type {
	SanityClientLike,
	SanityModernClientLike,
	SanityProjectDetails,
	SanityImageSource,
	ImageUrlBuilderOptions
} from '@sanity/image-url';
export type * from '@sanity/image-url';
import { VALID_BUILDER_OPTIONS } from './constants.js';
import type { HTMLImgAttributes } from 'svelte/elements';

/**
 * Sanity client or project details
 */

export type SanityClientOrProjectDetails =
	| SanityClientLike
	| SanityProjectDetails
	| SanityModernClientLike;

/**
 * The object key of the Sanity URL builder options
 */
type ValidSanityBuilderOptionKey =
	typeof VALID_BUILDER_OPTIONS extends Readonly<Set<infer T>> ? T : never;

/**
 * Valid options that can be passed to the Sanity URL builder
 */
export type ValidSanityBuilderOptions = {
	[key in ValidSanityBuilderOptionKey]: ImageUrlBuilderOptions[key];
};

/**
 * Props for the image component
 */

export type SvelteSanityImageOptions = {
	image: SanityImageSource;
	sizes: string | null;
	client: SanityClientOrProjectDetails;
	alt: string | null;
	aspect?: number;
	srcsetBreakpoints?: number[];
	preload?: boolean;
	autoFormat?: boolean;
};

type ValidImgElementProps = Omit<HTMLImgAttributes, 'src' | 'srcset' | 'alt'>;

export type SvelteSanityImageProps = SvelteSanityImageOptions &
	ValidImgElementProps &
	Partial<ValidSanityBuilderOptions>;
