// TODO: Allow passing in custom builder from component props?
// TODO: Check to make sure getSrcSet isn't unnescessarily upscaling images when handling aspect

import imageUrlBuilder from '@sanity/image-url';
import { getImageDimensions } from './getImageDimensions.js';
import { DEFAULT_IMAGE_SIZES } from './constants.js';
import type {
	SanityClientOrProjectDetails,
	SanityImageSource,
	SvelteSanityImageProps,
	ValidBuilderOptions
} from './types.js';

type ImageProps = {
	src: string;
	width: number;
	height: number;
	srcset: string | undefined;
};

type EmptyImageProps = Record<keyof ImageProps, undefined>;

type GetImagePropsOptions = Pick<SvelteSanityImageProps, 'aspect' | 'srcsetSizes'> &
	Partial<ValidBuilderOptions>;

/**
 * Retrieves the image properties based on the provided options.
 *
 * @param options - The options for retrieving the image properties. Corresponds to the props of the SvelteSanityImage component.
 * @returns The image properties including the source URL, source set, width, and height.
 */
export function getImageProps(
	image: SanityImageSource,
	client: SanityClientOrProjectDetails,
	{
		width: userSetWidth,
		height: userSetHeight,
		aspect,
		srcsetSizes,
		...options
	}: GetImagePropsOptions = {}
): ImageProps | EmptyImageProps {
	try {
		if (!image) {
			// Todo: add test
			throw new Error('No input "image" provided');
		}

		if (!client) {
			// TODO: add test
			throw new Error('Sanity client not provided.');
		}

		const urlBuilder = imageUrlBuilder(client).image(image).withOptions(options);

		/**
		 * Get "srcset"
		 * @returns the "srcset" prop based on the current options
		 */
		function getSrcset() {
			const srcset = (srcsetSizes || DEFAULT_IMAGE_SIZES)
				// Filter out sizes that are larger than the image itself
				.filter((srcSetWidth) => (userSetWidth ? srcSetWidth < userSetWidth : true))
				// Get a url where the image's width is overrided to match the srcset width.
				.map((srcSetWidth) => {
					return `${urlBuilder.width(srcSetWidth).url()} ${Math.round(srcSetWidth)}w`;
				})
				.join(', ');

			if (srcset !== '') {
				return srcset;
			}

			return undefined;
		}

		/**
		 * If the aspect ratio is defined, the height will be calculated accordingly.
		 * If not, these values will be the same as the initial dimensions.
		 */

		const { outputWidth, outputHeight } = (() => {
			/**
			 * Return the user defined width + height
			 */
			if (userSetWidth && userSetHeight) {
				return {
					outputWidth: userSetWidth,
					outputHeight: userSetHeight
				};
			}

			const { width: assetSourceWidth, height: assetSourceHeight } = getImageDimensions(image);

			if (!aspect) {
				return {
					outputWidth: assetSourceWidth,
					outputHeight: assetSourceHeight
				};
			}

			const outputWidth = Math.round(Math.min(assetSourceHeight, assetSourceHeight * aspect));
			const outputHeight = Math.round(outputWidth / aspect);

			return {
				outputWidth,
				outputHeight
			};
		})();

		// if (aspect) {
		// 	urlBuilder = urlBuilder.height(outputHeight).width(outputWidth);
		// }

		return {
			src: urlBuilder.url(),
			srcset: getSrcset(),
			width: outputWidth,
			height: outputHeight
		};
	} catch (e) {
		console.error('Error building image props:', e);

		return {
			src: undefined,
			srcset: undefined,
			width: undefined,
			height: undefined
		};
	}
}
