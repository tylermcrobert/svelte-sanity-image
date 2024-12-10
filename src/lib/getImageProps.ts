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
 * @param image - The Sanity image source.
 * @param client - The Sanity client or project details.
 * @param options - The options for retrieving the image properties.
 * @returns The image properties including the source URL, source set, width, and height.
 */
export function getImageProps(
	image: SanityImageSource,
	client: SanityClientOrProjectDetails,
	{
		width: customWidth,
		height: customHeight,
		aspect: customAspectRatio,
		srcsetSizes,
		...builderOptions
	}: GetImagePropsOptions = {}
): ImageProps | EmptyImageProps {
	try {
		if (!image) {
			throw new Error('No image provided.');
		}

		if (!client) {
			throw new Error('Sanity client not provided.');
		}

		let urlBuilder = imageUrlBuilder(client)
			.image(image)
			.withOptions({
				width: customWidth,
				height: customHeight,
				...builderOptions
			});

		/**
		 * Calculate output dimensions for the image.
		 */
		const { outputWidth, outputHeight } = (() => {
			if (customWidth && customHeight) {
				// Explicit dimensions provided
				return {
					outputWidth: customWidth,
					outputHeight: customHeight
				};
			}

			const { width: originalWidth, height: originalHeight } = getImageDimensions(image);
			const originalAspectRatio = originalWidth / originalHeight;

			if (customWidth) {
				// Calculate height based on provided width
				return {
					outputWidth: customWidth,
					outputHeight: Math.round(customWidth / originalAspectRatio)
				};
			}

			if (customHeight) {
				// Calculate width based on provided height
				return {
					outputWidth: Math.round(customHeight * originalAspectRatio),
					outputHeight: customHeight
				};
			}

			if (customAspectRatio) {
				// Calculate dimensions based on custom aspect ratio
				const calculatedHeight = Math.min(originalHeight, originalWidth / customAspectRatio);
				return {
					outputWidth: Math.round(calculatedHeight * customAspectRatio),
					outputHeight: Math.round(calculatedHeight)
				};
			}

			// Default to original dimensions
			return {
				outputWidth: originalWidth,
				outputHeight: originalHeight
			};
		})();

		const aspectRatio = customAspectRatio || outputWidth / outputHeight;

		if (customAspectRatio) {
			urlBuilder = urlBuilder.width(outputWidth).height(outputHeight);
		}

		/**
		 * Determine breakpoints for srcset.
		 */
		const validBreakpoints = (() => {
			const breakpoints = srcsetSizes || DEFAULT_IMAGE_SIZES;

			if (customHeight) {
				// Ensure breakpoints align with the height
				return breakpoints.filter((breakpoint) => breakpoint <= customHeight * aspectRatio);
			}

			// Exclude breakpoints larger than the output width
			return breakpoints.filter((breakpoint) => breakpoint <= outputWidth);
		})();

		/**
		 * Build srcset
		 *
		 * Build an image url for each size width, and combine into an srcset
		 */
		const srcset = (() => {
			if (!validBreakpoints.length) return undefined;

			return validBreakpoints
				.map((breakpoint) => {
					// If aspect is set, calculate output height
					if (customAspectRatio) {
						const calculatedHeight = Math.round(breakpoint / customAspectRatio);
						return urlBuilder.height(calculatedHeight).width(breakpoint).url();
					}

					// The height that the user selects must be included in srcset
					if (customHeight && !customWidth) {
						const calculatedHeight = Math.round(breakpoint / aspectRatio);
						return urlBuilder.height(calculatedHeight).width(breakpoint).url();
					}

					// Default case
					return urlBuilder.width(breakpoint).url();
				})
				.map((url, i) => `${url} ${validBreakpoints[i]}w`)
				.join(', ');
		})();

		return {
			src: urlBuilder.url(),
			srcset,
			width: outputWidth,
			height: outputHeight
		};
	} catch (error) {
		console.error('Error building image props:', error);

		return {
			src: undefined,
			srcset: undefined,
			width: undefined,
			height: undefined
		};
	}
}
