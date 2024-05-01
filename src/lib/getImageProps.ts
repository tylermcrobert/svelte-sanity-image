// TODO: Allow passing in custom builder from component props?
// TODO: Check to make sure getSrcSet isn't unnescessarily upscaling images when handling aspect

import imageUrlBuilder from '@sanity/image-url';
import getImageDimensions from './getImageDimensions';
import { DEFAULT_IMAGE_SIZES } from './constants';
import type { SvelteSanityImageProps } from './types';

type PropsToInclude =
	| 'client'
	| 'image'
	| 'quality'
	| 'autoFormat'
	| 'aspect'
	| 'srcsetSizes';

type ImageProps = {
	src: string;
	srcset: string;
	width: number;
	height: number;
};

type EmptyImageProps = {
	src: undefined;
	srcset: undefined;
	width: undefined;
	height: undefined;
};

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
}: Pick<SvelteSanityImageProps, PropsToInclude>): ImageProps | EmptyImageProps {
	let urlBuilder = imageUrlBuilder(client).image(image);

	/**
	 * Returns the srcset string for the image based on the available device sizes.
	 * @returns The srcset string.
	 */
	function getSrcset() {
		return (srcsetSizes || DEFAULT_IMAGE_SIZES)
			.map((w) => {
				urlBuilder = urlBuilder.width(w);

				/**
				 * If the aspect ratio is defined, the height will be calculated accordingly. We don't modify
				 * the width because it's being tracked to the specific srcset.
				 */
				if (aspect) {
					const newHeight = Math.round(w / aspect);
					urlBuilder = urlBuilder.height(newHeight);
				}

				return `${urlBuilder.url()} ${Math.round(w)}w`;
			})
			.join(', ');
	}

	try {
		if (!image) {
			throw new Error('No input "image" provided');
		}

		const initialDims = getImageDimensions(image);
		const { height: initHeight, width: initWidth } = initialDims;

		/**
		 * If the aspect ratio is defined, the height will be calculated accordingly.
		 * If not, these values will be the same as the initial dimensions.
		 */
		const { outputWidth, outputHeight } = (() => {
			if (!aspect) {
				return { outputWidth: initWidth, outputHeight: initHeight };
			}

			const outputWidth = Math.round(Math.min(initWidth, initHeight * aspect));
			const outputHeight = Math.round(outputWidth / aspect);

			return { outputWidth, outputHeight };
		})();

		if (autoFormat) {
			urlBuilder = urlBuilder.auto('format');
		}

		if (quality) {
			urlBuilder = urlBuilder.quality(quality);
		}

		if (aspect) {
			urlBuilder = urlBuilder.height(outputHeight).width(outputWidth);
		}

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
