// https://github.com/lorenzodejong/next-sanity-image/blob/main/src/useNextSanityImage.ts#L33
import type {
	SanityImageSource,
	SanityImageObject
} from '@sanity/image-url/lib/types/types.d.ts';

export type ImageDimensionsOutput = {
	width: number;
	height: number;
	aspectRatio: number;
};

/**
 * Extracts the reference ID from a Sanity image source.
 * @param image - The Sanity image source.
 * @returns The reference ID or `undefined` if it cannot be extracted.
 */
export function getReferenceId(image: SanityImageSource): string {
	if (!image) {
		throw new Error('input "image" is empty. Cannot get _ref or _id. ');
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

	throw new Error('input "image" is malformed. Cannot get _ref or _id.');
}

/**
 * Extracts the initial dimensions from a Sanity asset reference string.
 * @param ref - The Sanity asset reference string.
 * @returns The image dimensions and aspect ratio.
 * @throws Error if the reference string is invalid.
 */
export function getDimsFromRefString(ref: string): ImageDimensionsOutput {
	const dimensionsStr = ref.split('-')[2];

	if (!dimensionsStr) {
		throw new Error(`Invalid asset _ref provided: "${ref}"`);
	}

	const [width, height] = dimensionsStr.split('x').map(Number);

	if (!width || !height || isNaN(width) || isNaN(height)) {
		throw new Error(`Invalid dimensions in _ref string: "${ref}"`);
	}

	return { width, height, aspectRatio: width / height };
}

/**
 * Extracts the dimensions and aspect ratio of a Sanity image.
 * @param image - The Sanity image source.
 * @returns The image dimensions and aspect ratio.
 * @throws Error if the image object is invalid.
 */
export default function getImageDimensions(
	image: SanityImageSource
): ImageDimensionsOutput {
	const refId = getReferenceId(image);

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
