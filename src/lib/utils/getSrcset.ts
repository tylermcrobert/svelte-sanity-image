import { DEFAULT_QUALITY, IMG_DEVICE_SIZES, IMG_SCALING } from './constants';
import getBuilder from './getBuilder';

import type { SanityClient } from '@sanity/client';
import type { ResponsiveImageProps, SanityImage } from './types';

type SrcsetOptions = Pick<ResponsiveImageProps, ResponsiveImagePropsPickKeys>;
type ResponsiveImagePropsPickKeys = 'quality' | 'enforcedAspect' | 'client';

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
	 * Gets a url by it's width
	 * @param width width of srcset size
	 * @returns
	 */

	function getUrlByWidth(width: number) {
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
	 * A comma-separated responsive URL string
	 */

	const srcSet = IMG_DEVICE_SIZES.map(getUrlByWidth).join(', ');

	return srcSet;
}
