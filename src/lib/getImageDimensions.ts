// https://github.com/lorenzodejong/next-sanity-image/blob/main/src/useNextSanityImage.ts#L33
import type { SanityImageSource, SanityImageObject } from '@sanity/image-url/lib/types/types.d.ts';
import { getAssetDimensionsFromRefString } from './getAssetDimensionsFromRefString.js';
import { getReferenceId } from './getReferenceId.js';

export type ImageDimensions = {
	width: number;
	height: number;
	aspectRatio: number;
};

/**
 * Extracts the dimensions and aspect ratio of a Sanity image.
 * @param image - The Sanity image source.
 * @returns The image dimensions and aspect ratio.
 * @throws Error if the image object is invalid.
 */
export function getImageDimensions(image: SanityImageSource): ImageDimensions {
	const refId = getReferenceId(image);

	const baseDims = getAssetDimensionsFromRefString(refId);
	const crop = (image as SanityImageObject).crop;

	if (!crop) {
		return baseDims;
	}

	const croppedWidth = baseDims.width * (1 - (crop.left + crop.right));
	const croppedHeight = baseDims.height * (1 - (crop.top + crop.bottom));

	return {
		width: Math.round(croppedWidth),
		height: Math.round(croppedHeight),
		aspectRatio: croppedWidth / croppedHeight
	};
}
