import imageUrlBuilder from '@sanity/image-url';
import getImageDimensions from './getImageDimensions';
import { DEFAULT_QUALITY, IMG_DEVICE_SIZES, IMG_SCALING } from './constants';

import type { GetImagePropsReturn, GetImagePropsOptions } from './types';

/**
 * Return an object with generated image props
 * @param options
 * @returns object with image attrs
 */

export default function getImageProps({
	image,
	quality,
	enforcedAspect,
	client
}: GetImagePropsOptions): GetImagePropsReturn {
	const { width, height } = getImageDimensions(image);
	const builder = imageUrlBuilder(client).image(image);

	/**
	 * Get a srcset string for responsive images.
	 */

	function getSrcset() {
		return IMG_DEVICE_SIZES.map(getUrlByWidth).join(', ');
	}

	/**
	 * Gets a url by it's width
	 * @param width width of srcset size
	 * @returns a return
	 */

	function getUrlByWidth(width: number) {
		let urlBuilder = builder
			.width(width)
			.auto('format')
			.quality(quality || DEFAULT_QUALITY);

		if (enforcedAspect) {
			urlBuilder = builder.height(Math.round(width / enforcedAspect));
		}

		return `${urlBuilder.url()} ${Math.round(width / IMG_SCALING)}w`;
	}

	return {
		src: builder.url(),
		srcset: getSrcset(),
		width,
		height: enforcedAspect ? Math.round(width / enforcedAspect) : height
	};
}
