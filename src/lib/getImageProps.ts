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
		aspect: requestedAspect,
		srcsetSizes,
		...options
	}: GetImagePropsOptions = {}
): ImageProps | EmptyImageProps {
	try {
		if (!image) {
			throw new Error('No input "image" provided');
		}

		if (!client) {
			throw new Error('Sanity client not provided.');
		}

		let urlBuilder = imageUrlBuilder(client).image(image).withOptions(options);

		/**
		 * 1. Get the output width and height for the image tag.
		 *
		 * If the aspect ratio is defined, the height will be calculated accordingly.
		 * If not, these values will be the same as the initial dimensions.
		 */
		const { outputWidth, outputHeight } = (() => {
			/** If user set width + height, just return those  */
			if (userSetWidth && userSetHeight) {
				return {
					outputWidth: userSetWidth,
					outputHeight: userSetHeight
				};
			}

			/** Get original image dimension  */
			const {
				width: assetSourceWidth,
				height: assetSourceHeight,
				aspectRatio
			} = getImageDimensions(image);

			/** If user set width, return with calculated height */
			if (userSetWidth) {
				return {
					outputWidth: userSetWidth,
					outputHeight: Math.round(userSetWidth / aspectRatio)
				};
			}

			/** If user set height, return with calculated width */
			if (userSetHeight) {
				return {
					outputWidth: Math.round(userSetHeight * aspectRatio),
					outputHeight: userSetHeight
				};
			}

			/**
			 * 1.3 if aspect is set, return based on that.
			 */
			// TODO: handle requestedaspect
			// if (requestedAspect) {
			// 	//TODO: change based on fit/crop/etc?
			// 	const outputWidth = Math.round(Math.min(assetSourceHeight, assetSourceHeight * requestedAspect));
			// 	const outputHeight = Math.round(outputWidth / requestedAspect);

			// 	return {
			// 		outputWidth,
			// 		outputHeight
			// 	};
			// }

			/** If no user set widths, heights, or aspect ratios defined, return original asset size */
			return {
				outputWidth: assetSourceWidth,
				outputHeight: assetSourceHeight
			};
		})();

		/**
		 * 2. Update urlbuilder
		 *
		 * Update the image builder's width and height with the calculated values above.
		 */

		urlBuilder = urlBuilder.height(outputHeight).width(outputWidth); // todo: only when nescessary

		/**
		 * 3. Srcset sizes
		 *
		 * Build an image url for each size width, and combine into an srcset
		 */
		const srcset = (() => {
			const sizes = srcsetSizes || DEFAULT_IMAGE_SIZES;

			/** Only include sizes that are equal or smaller than the output width  */
			const validSizes = sizes.filter((breakpoint) => breakpoint <= outputWidth);

			/** If the image width will always be smaller than the smallest size, don't render an srcset at all */
			if (!validSizes.length) {
				return undefined;
			}

			/** Build srcset from breakpoints */
			const srcset = validSizes
				.map((breakpoint) => {
					const inherentAspect = outputWidth / outputHeight;
					const aspect = requestedAspect || inherentAspect;

					return `${urlBuilder
						.height(Math.round(breakpoint / aspect))
						.width(breakpoint)
						.url()} ${breakpoint}w`;
				})
				.join(', ');

			return srcset;
		})();

		/**
		 * 4. Return values
		 */
		return {
			src: urlBuilder.url(),
			srcset,
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
