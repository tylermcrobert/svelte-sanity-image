import { urlFor } from '$lib/sanity/client';
import { DEFAULT_QUALITY, IMG_DEVICE_SIZES, IMG_SCALING } from './constants';
import type { EnforcedAspect, Quality, SanityImage } from './types';

type SrcsetOptions = {
	quality: Quality;
	enforcedAspect: EnforcedAspect;
};

/**
 * Generates srcset for responsive images.
 * @param image Sanity Image object.
 * @param options Srcset options
 * @returns Comma-separated srcset string.
 */

export default function getSrcset(
	image: SanityImage,
	{ quality, enforcedAspect }: SrcsetOptions
) {
	/**
	 * Get URL
	 * @param width width of srcset size
	 * @returns
	 */

	function getUrl(width: number) {
		let builder = urlFor(image)
			.width(width)
			.auto('format')
			.quality(quality || DEFAULT_QUALITY);

		if (enforcedAspect) {
			builder = builder.height(Math.round(width / enforcedAspect));
		}

		return `${builder.url()} ${Math.round(width / IMG_SCALING)}w`;
	}

	/**
	 * Src Set
	 *
	 * Generates string for each device
	 * size and joins with a comma
	 */

	const srcSet = IMG_DEVICE_SIZES.map((width) => getUrl(width)).join(', ');

	return srcSet;
}
