import imageUrlBuilder from '@sanity/image-url';
import getImageDimensions from './getImageDimensions';
import { DEFAULT_SRCSET_SIZES } from './constants';
import type { Props } from './types';

// TODO: Allow passing in custom builder from component props?
// TODO: Consider how enforcedAspect alters
//       height and if/when it should affect width instead.

/**
 * Retrieves the image properties based on the provided options.
 *
 * @param options - The options for retrieving the image properties. Corresponds to the props of the SvelteSanityImage component.
 * @returns The image properties including the source URL, source set, width, and height.
 */

export default function getImageProps({
	image,
	client,
	quality,
	autoFormat,
	aspect,
	srcsetSizes
}: GetImagePropsOptions): GetImagePropsReturn {
	let urlBuilder = imageUrlBuilder(client).image(image);
	const { width, height } = getImageDimensions(image);

	/**
	 * Set urlBuilder attributes first.
	 */

	if (autoFormat) {
		urlBuilder = urlBuilder.auto('format');
	}

	if (quality) {
		urlBuilder = urlBuilder.quality(quality);
	}

	/**
	 * Returns the srcset string for the image based on the available device sizes.
	 * @returns The srcset string.
	 */

	function getSrcset() {
		/**
		 * Get an image URL with a specific width.
		 * @param width - The desired width of the image.
		 * @returns The URL and width descriptor for the image.
		 */

		function getUrlByWidth(width: number) {
			urlBuilder = urlBuilder.width(width);

			/**
			 * If the aspect ratio is defined, the height will be calculated accordingly.
			 */

			if (aspect) {
				urlBuilder = urlBuilder.height(Math.round(width / aspect));
			}

			return `${urlBuilder.url()} ${Math.round(width)}w`;
		}

		return (srcsetSizes || DEFAULT_SRCSET_SIZES).map(getUrlByWidth).join(', ');
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

type GetImagePropsOptions = Pick<
	Props,
	'client' | 'image' | 'quality' | 'autoFormat' | 'aspect' | 'srcsetSizes'
>;

/**
 * Object that is returned from getImageProps()
 */
export type GetImagePropsReturn = {
	src: string;
	srcset: string;
	width: number;
	height: number;
};
