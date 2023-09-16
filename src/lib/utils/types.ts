/**
 * Sanity Image
 */

import type { SanityClient } from '@sanity/client';

export type SanityImage = {
	_type: 'image';
	asset: Asset;
} & Partial<CroppedImage>;

type Asset = {
	_ref: string;
	_type: string;
};

/**
 * Sanity Image Crop
 */

type CroppedImage = {
	_type: string;
	crop: Crop;
	hotspot: Hotspot;
	asset: Asset;
};

type Crop = {
	_type: string;
	top: number;
	left: number;
	bottom: number;
	right: number;
};

type Hotspot = {
	_type: string;
	height: number;
	width: number;
	x: number;
	y: number;
};

/**
 *
 */

export type ResponsiveImageProps = {
	image: SanityImage;
	sizes: string;
	client: SanityClient;
	alt: string;

	// Optional
	quality?: number;
	enforcedAspect?: number;
};

type GetImagePropsOptionsKeys =
	| 'image'
	| 'quality'
	| 'enforcedAspect'
	| 'client';

export type GetImagePropsOptions = Pick<
	ResponsiveImageProps,
	GetImagePropsOptionsKeys
>;

export type GetImagePropsReturn = {
	src: string;
	srcset: string;
	style: string;
};
