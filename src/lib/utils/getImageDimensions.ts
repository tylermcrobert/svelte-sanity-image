// https://github.com/lorenzodejong/next-sanity-image/blob/main/src/useNextSanityImage.ts#L33

import type {
	SanityImageSource,
	SanityImageObject,
	SanityReference,
	SanityAsset
} from '@sanity/image-url/lib/types/types.d.ts';

export type ImageDimensionsOutput = {
	width: number;
	height: number;
	aspectRatio: number;
};

/**
 * Retrieves the reference ID of a Sanity image.
 * @param image - The Sanity image source.
 * @returns The reference ID of the image, or undefined if not found.
 */

// TODO: Add tests
// TODO: catch this:

// interface SanityImageWithAssetStub {
// 	asset: {
// 		url: string;
// 	};
// }

export function getReferenceId(image: SanityImageSource): string | undefined {
	if (typeof image === 'string') {
		return image;
	}

	const obj = image as SanityImageObject;
	const ref = image as SanityReference;
	const img = image as SanityAsset;

	if (obj.asset) {
		return obj.asset._ref || (obj.asset as SanityAsset)._id;
	}

	return ref._ref || img._id || undefined;
}

/**
 * Takes the asset _ref and extracts the initial dimensions from it
 */

export function getDimsFromRefString(ref: string): ImageDimensionsOutput {
	const dimensionsStr = ref.split('-')[2] as string | undefined;

	if (!dimensionsStr) {
		throw new Error(`Invalid asset _ref provided: "${ref}"`);
	}

	const [width, height] = dimensionsStr
		.split('x')
		.map((num: string) => parseInt(num, 10));

	if (isNaN(height) || isNaN(width) || !height || !width) {
		throw new Error(`Invalid dimensions in _ref string: "${ref}"`);
	}

	return { width, height, aspectRatio: width / height };
}

/**
 * Takes sanity image and pulls the dimensions and aspect ratio out
 */

export default function getImageDimensions(
	image: SanityImageSource
): ImageDimensionsOutput {
	const refId = getReferenceId(image);

	if (!refId) {
		throw new Error('Invalid image object provided');
	}

	const baseDims = getDimsFromRefString(refId);
	const crop = (image as SanityImageObject).crop;

	if (!crop) {
		return baseDims;
	}

	const croppedWidth = baseDims.width * (1 - (crop.left + crop.right));
	const croppedHeight = baseDims.height * (1 - (crop.top + crop.bottom));

	return {
		width: croppedWidth,
		height: croppedHeight,
		aspectRatio: croppedWidth / croppedHeight
	};
}
