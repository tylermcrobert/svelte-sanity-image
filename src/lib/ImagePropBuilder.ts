import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder.js';
import type { GetImagePropsOptions } from './getImageProps.js';
import type { SanityClientOrProjectDetails, SanityImageSource } from './types.js';
import imageUrlBuilder from '@sanity/image-url';
import { DEFAULT_IMAGE_SIZES } from './constants.js';
import { getImageDimensions } from './getImageDimensions.js';

export class ImagePropBuilder {
	urlBuilder: ImageUrlBuilder;
	srcsetBreakpoints: number[];

	srcset: string | undefined;
	width: number;
	height: number;
	aspectRatio: number;

	customWidth: number | undefined;
	customHeight: number | undefined;
	customAspectRatio: number | undefined;

	originalHeight: number;
	originalWidth: number;
	originalAspectRatio: number;

	constructor(
		image: SanityImageSource,
		client: SanityClientOrProjectDetails,
		options: GetImagePropsOptions = {}
	) {
		if (!image || !client) {
			throw new Error('Sanity image and client are required.');
		}

		const { aspect, srcsetSizes, ...builderOptions } = options;

		this.customAspectRatio = aspect;
		this.customWidth = builderOptions.width;
		this.customHeight = builderOptions.height;

		this.srcsetBreakpoints = srcsetSizes || DEFAULT_IMAGE_SIZES;
		this.urlBuilder = imageUrlBuilder(client).image(image).withOptions(builderOptions);

		const originalDims = getImageDimensions(image);

		this.originalWidth = originalDims.width;
		this.originalHeight = originalDims.height;
		this.originalAspectRatio = originalDims.width / originalDims.height;

		const calculatedDims = this.calculateOutputDimensions();

		this.width = calculatedDims.outputWidth;
		this.height = calculatedDims.outputHeight;
		this.aspectRatio = calculatedDims.outputWidth / calculatedDims.outputHeight;

		if (this.customAspectRatio) {
			this.urlBuilder = this.urlBuilder.width(this.width).height(this.height);
		}

		this.srcset = this.getSrcset();
	}

	/**
	 *
	 */
	private calculateOutputDimensions() {
		if (this.customWidth && this.customHeight) {
			// Explicit dimensions provided
			return {
				outputWidth: this.customWidth,
				outputHeight: this.customHeight
			};
		}

		// TODO: handle aspect + width, aspect + height

		if (this.customAspectRatio) {
			// TODO: Check this logic
			// Calculate dimensions based on custom aspect ratio
			const calculatedHeight = Math.min(
				this.originalHeight,
				this.originalWidth / this.customAspectRatio
			);
			return {
				outputWidth: Math.round(calculatedHeight * this.customAspectRatio),
				outputHeight: Math.round(calculatedHeight)
			};
		}

		if (this.customHeight) {
			// Calculate width based on provided height
			return {
				outputWidth: Math.round(this.customHeight * this.originalAspectRatio),
				outputHeight: this.customHeight
			};
		}

		if (this.customWidth) {
			// Calculate height based on provided width
			return {
				outputWidth: this.customWidth,
				outputHeight: Math.round(this.customWidth / this.originalAspectRatio)
			};
		}

		// Default to original dimensions
		return {
			outputWidth: this.originalWidth,
			outputHeight: this.originalHeight
		};
	}

	/**
	 *
	 */
	private getValidBreakpoints() {
		const breakpoints = this.srcsetBreakpoints;
		const customHeight = this.customHeight;

		if (customHeight) {
			// Ensure breakpoints align with the height
			return breakpoints.filter((breakpoint) => breakpoint <= customHeight * this.aspectRatio);
		}

		// Exclude breakpoints larger than the output width
		return breakpoints.filter((breakpoint) => breakpoint <= this.width);
	}

	/**
	 *
	 */
	private getSrcset() {
		const breakpoints = this.getValidBreakpoints();

		if (!breakpoints.length) {
			return undefined;
		}

		return breakpoints
			.map((breakpoint) => {
				// If aspect is set, calculate output height
				if (this.customAspectRatio) {
					const calculatedHeight = Math.round(breakpoint / this.customAspectRatio);
					return this.urlBuilder.height(calculatedHeight).width(breakpoint).url();
				}

				// The height that the user selects must be included in srcset
				if (this.customHeight && !this.customWidth) {
					const calculatedHeight = Math.round(breakpoint / this.aspectRatio);
					return this.urlBuilder.height(calculatedHeight).width(breakpoint).url();
				}

				// Default case
				return this.urlBuilder.width(breakpoint).url();
			})
			.map((url, i) => `${url} ${breakpoints[i]}w`)
			.join(', ');
	}
}
