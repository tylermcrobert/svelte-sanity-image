import imageUrlBuilder from '@sanity/image-url';
import getImageDimensions from './getImageDimensions';
import { DEFAULT_QUALITY, DEVICE_SIZES } from './constants';
import type { Props } from './types';

// TODO: Allow passing in custom builder from component props?
// TODO: Consider how enforcedAspect alters
//       height and if/when it should affect width instead.

/**
 * Return an object with generated image props
 * @param options
 * @returns object with image attrs
 */

export default function getImageProps({
	image,
	client,
	quality,
	autoFormat,
	aspect
}: GetImagePropsOptions): GetImagePropsReturn {
	let urlBuilder = imageUrlBuilder(client).image(image);
	const { width, height } = getImageDimensions(image);

	if (autoFormat) {
		urlBuilder = urlBuilder.auto('format');
	}

	function getUrlByWidth(width: number) {
		urlBuilder = urlBuilder.width(width).quality(quality || DEFAULT_QUALITY);

		if (aspect) {
			urlBuilder = urlBuilder.height(Math.round(width / aspect));
		}

		return `${urlBuilder.url()} ${Math.round(width)}w`;
	}

	function getSrcset() {
		return DEVICE_SIZES.map(getUrlByWidth).join(', ');
	}

	return {
		src: urlBuilder.url(),
		srcset: getSrcset(),
		width: Math.round(width),
		height: aspect ? Math.round(width / aspect) : height
	};
}

/**
 * Options for getImageProps()
 */

type GetImagePropsOptions = Pick<Props, ImagePropKey>;
type ImagePropKey = 'client' | 'image' | 'quality' | 'autoFormat' | 'aspect';

/**
 * Object that is returned from getImageProps()
 */
export type GetImagePropsReturn = {
	src: string;
	srcset: string;
	width: number;
	height: number;
};
