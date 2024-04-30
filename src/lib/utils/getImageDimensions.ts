import type { SanityImageSource } from '@sanity/image-url/lib/types/types.d.ts';
import { getRefId } from './getRefId';

/**
 * Output of getImageDimensions()
 */

export type ImageDimensionsOutput = {
	width: number;
	height: number;
	aspectRatio: number;
};

/**
 * Takes sanity image and pulls
 * the dimensions and  aspect ratio out
 */

export default function getImageDimensions(
	image: SanityImageSource
): ImageDimensionsOutput {
	const refId = getRefId(image);

	if (!refId) {
		throw new Error('Invalid image object provided');
	}

	const baseDimensions = getDimsFromRefString(refId);
	const crop = image.crop;

	if (!crop) return baseDimensions;

	const { width, height } = baseDimensions;

	const croppedWidth = width * (1 - (crop.left + crop.right));
	const croppedHeight = height * (1 - (crop.top + crop.bottom));

	return {
		width: croppedWidth,
		height: croppedHeight,
		aspectRatio: croppedWidth / croppedHeight
	};
}

/**
 * Takes the asset _ref and
 * extracts the initial dimensions from it
 */

export function getDimsFromRefString(ref: string): ImageDimensionsOutput {
	const dimensionsStr = ref.split('-')[2];

	if (!dimensionsStr) {
		throw new Error(`Invalid asset _ref provided: "${ref}"`);
	}

	const [width, height] = dimensionsStr
		.split('x')
		.map((num: string) => parseInt(num, 10));

	if (isNaN(height) || isNaN(width) || !height || !width) {
		throw new Error(`Invalid dimensions in _ref string: "${ref}"`);
	}

	return {
		width,
		height,
		aspectRatio: width / height
	};
}

// Reference: https://github.com/lorenzodejong/next-sanity-image/blob/e1eb37fbcccf8bcf5f083dd0a4e2b945139f5c6b/src/useNextSanityImage.ts
