import imageUrlBuilder from '@sanity/image-url';
import getImageDimensions from './getImageDimensions';
import { DEFAULT_QUALITY, IMG_DEVICE_SIZES, IMG_SCALING } from './constants';
import type { SvelteSanityImageProps } from './types';

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
	const initBuilder = imageUrlBuilder(client).image(image);
	const { width, height } = getImageDimensions(image);

	function getSrcset() {
		return IMG_DEVICE_SIZES.map(getUrlByWidth).join(', ');
	}

	function getUrlByWidth(width: number) {
		let urlBuilder = initBuilder
			.width(width)
			.auto('format')
			.quality(quality || DEFAULT_QUALITY);

		if (enforcedAspect) {
			urlBuilder = urlBuilder.height(Math.round(width / enforcedAspect));
		}

		return `${urlBuilder.url()} ${Math.round(width / IMG_SCALING)}w`;
	}

	return {
		src: initBuilder.url(),
		srcset: getSrcset(),
		width,
		height: enforcedAspect ? Math.round(width / enforcedAspect) : height
	};
}

/**
 * Options for getImageProps()
 */

export type GetImagePropsOptions = {
	image: SvelteSanityImageProps['image'];
	quality: SvelteSanityImageProps['quality'];
	enforcedAspect: SvelteSanityImageProps['enforcedAspect'];
	client: SvelteSanityImageProps['client'];
};

/**
 * Object that is returned from getImageProps()
 */
export type GetImagePropsReturn = {
	src: string;
	srcset: string;
	width: number;
	height: number;
};
