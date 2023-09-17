import type { SanityImageObject, SanityImageSource } from './types';
// Reference: https://github.com/lorenzodejong/next-sanity-image/blob/e1eb37fbcccf8bcf5f083dd0a4e2b945139f5c6b/src/useNextSanityImage.ts

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
	const { asset, crop } = image as SanityImageObject;
	const baseDimensions = getDimsFromId(asset._ref);
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
 * extracts the dimensions from it
 */

function getDimsFromId(ref: string): ImageDimensionsOutput {
	const dimensionsStr = ref.split('-')[2];
	const [width, height] = dimensionsStr
		.split('x')
		.map((num: string) => parseInt(num, 10));

	return { width, height, aspectRatio: width / height };
}
