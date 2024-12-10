import type { ImageDimensions } from './getImageDimensions.js';

/**
 * Extracts the initial dimensions from a Sanity asset reference string.
 *
 * @param {string} ref - The Sanity asset reference string.
 * @returns {ImageDimensions} The image dimensions and aspect ratio.
 * @throws {Error} If the reference string is invalid.
 */
export function getAssetDimensionsFromRefString(ref: string): ImageDimensions {
	const dimensionsStr = ref.split('-')[2];

	if (!dimensionsStr) {
		throw new Error(`Invalid asset _ref provided: "${ref}"`);
	}

	const [width, height] = dimensionsStr.split('x').map(Number);

	if (!width || !height || isNaN(width) || isNaN(height)) {
		throw new Error(`Invalid dimensions in _ref string: "${ref}"`);
	}

	return { width, height };
}
