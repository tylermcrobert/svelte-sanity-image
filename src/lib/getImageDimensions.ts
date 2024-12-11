import type { SanityImageSource, SanityImageObject } from '@sanity/image-url/lib/types/types.d.ts';

export type ImageDimensions = {
	width: number;
	height: number;
};

/**
 * Extracts the reference ID from a Sanity image source.
 * @param {SanityImageSource} image - The Sanity image source.
 * @returns {string} The reference ID or `undefined` if it cannot be extracted.
 */
export function getAssetStringFromImageSource(image: SanityImageSource): string {
	if (!image) {
		throw new Error('Invalid input: image is empty. Cannot get _ref or _id. ');
	}

	if (typeof image === 'string') {
		return image;
	}

	if ('asset' in image) {
		return image?.asset?._ref || image?.asset?._id;
	}

	if ('_ref' in image) {
		return image?._ref;
	}

	if ('_id' in image && image?._id) {
		return image?._id;
	}

	throw new Error('Invalid input: image is malformed. Cannot get _ref or _id.');
}

/**
 * Extracts the initial dimensions from a Sanity asset reference string.
 *
 * @param {string} ref - The Sanity asset reference string.
 * @returns {ImageDimensions} The image dimensions and aspect ratio.
 * @throws {Error} If the reference string is invalid.
 */
export function getAssetDimensionsFromRefString(assetStr: string): ImageDimensions {
	const dimensionsStr = assetStr.split('-')[2];

	if (!dimensionsStr) {
		throw new Error(`Invalid input: asset "${assetStr}" is invalid`);
	}

	const [width, height] = dimensionsStr.split('x').map(Number);

	if (!width || !height || isNaN(width) || isNaN(height)) {
		throw new Error(`Invalid dimensions in _ref string: "${assetStr}"`);
	}

	return { width, height };
}

/**
 * Extracts the dimensions and aspect ratio of a Sanity image.
 *
 * @param {SanityImageSource} image - The Sanity image source.
 * @returns {ImageDimensions} The image dimensions and aspect ratio.
 * @throws {Error} If the image object is invalid.
 */
export function getImageDimensions(image: SanityImageSource): ImageDimensions {
	const assetStr = getAssetStringFromImageSource(image);
	const baseDims = getAssetDimensionsFromRefString(assetStr);
	const crop = (image as SanityImageObject).crop;

	if (!crop) {
		return baseDims;
	}

	const croppedWidth = baseDims.width * (1 - (crop.left + crop.right));
	const croppedHeight = baseDims.height * (1 - (crop.top + crop.bottom));

	return {
		width: Math.round(croppedWidth),
		height: Math.round(croppedHeight)
	};
}
