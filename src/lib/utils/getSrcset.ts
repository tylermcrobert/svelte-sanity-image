// import { urlFor } from '$lib/sanity/client';
import type { SanityClient } from '@sanity/client';
import { DEFAULT_QUALITY, IMG_DEVICE_SIZES, IMG_SCALING } from './constants';
import getBuilder from './getBuilder';
import type { EnforcedAspect, Quality, SanityImage } from './types';

type SrcsetOptions = {
	quality: Quality;
	enforcedAspect: EnforcedAspect;
	client: SanityClient;
};

/**
 * Generates srcset for responsive images.
 * @param image Sanity Image object.
 * @param client Configured Sanity client.
 * @param options Srcset options
 * @returns Comma-separated srcset string.
 */

export default function getSrcset(
	image: SanityImage,
	client: SanityClient,
	{ quality, enforcedAspect }: SrcsetOptions
) {
	/**
	 * Get URL
	 * @param width width of srcset size
	 * @returns
	 */

	function getUrl(width: number) {
		let builder = getBuilder(image, client)
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
