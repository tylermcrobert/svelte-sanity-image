import getImageDimensions from './getImageDimensions';
import { DEFAULT_QUALITY, IMG_DEVICE_SIZES, IMG_SCALING } from './constants';
import getBuilder from './getBuilder';

import type { GetImagePropsReturn, GetImagePropsOptions } from './types';

/**
 * Return an object with image props
 * @param param0
 * @returns GetImagePropsReturn
 */

export default function getImageProps({
	image,
	quality,
	enforcedAspect,
	client
}: GetImagePropsOptions): GetImagePropsReturn {
	const { width, height } = getImageDimensions(image);

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
		let builder = getBuilder(image, client)
			.width(width)
			.auto('format')
			.quality(quality || DEFAULT_QUALITY);

		if (enforcedAspect) {
			builder = builder.height(Math.round(width / enforcedAspect));
		}

		return `${builder.url()} ${Math.round(width / IMG_SCALING)}w`;
	}

	return {
		src: getBuilder(image, client).url(),
		srcset: getSrcset(),
		width,
		height: enforcedAspect ? Math.round(width / enforcedAspect) : height
	};
}
