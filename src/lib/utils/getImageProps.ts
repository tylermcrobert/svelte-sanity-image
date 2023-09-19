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
	const initBuilder = imageUrlBuilder(client).image(image);
	const { width, height } = getImageDimensions(image);

	function getSrcset() {
		return DEVICE_SIZES.map(getUrlByWidth).join(', ');
	}

	function getUrlByWidth(width: number) {
		let urlBuilder = initBuilder
			.width(width)
			.quality(quality || DEFAULT_QUALITY);

		if (aspect) {
			urlBuilder = urlBuilder.height(Math.round(width / aspect));
		}

		if (autoFormat) {
			urlBuilder = urlBuilder.auto('format');
		}

		return `${urlBuilder.url()} ${Math.round(width)}w`;
	}

	return {
		src: initBuilder.url(),
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
