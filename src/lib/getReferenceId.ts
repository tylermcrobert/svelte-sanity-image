import type { SanityImageSource } from './types.js';

/**
 * Extracts the reference ID from a Sanity image source.
 * @param image - The Sanity image source.
 * @returns The reference ID or `undefined` if it cannot be extracted.
 */
export function getReferenceId(image: SanityImageSource): string {
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
