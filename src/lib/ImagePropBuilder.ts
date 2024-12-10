// Import required types and modules
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder.js';
import type { GetImagePropsOptions } from './getImageProps.js';
import type { SanityClientOrProjectDetails, SanityImageSource } from './types.js';
import imageUrlBuilder from '@sanity/image-url';
import { DEFAULT_IMAGE_SIZES } from './constants.js';
import { getImageDimensions } from './getImageDimensions.js';

type Dimensions = {
	width: number;
	height: number;
	aspectRatio: number;
};

/**
 * Class that takes in props from the SvelteSanityImage component
 */
export class ImagePropBuilder {
	urlBuilder: ImageUrlBuilder; // Builder for Sanity image URLs
	srcsetBreakpoints: number[]; // Array of breakpoints for srcset generation
	srcset: string | undefined; // Srcset string
	dimensions: Dimensions; // Final dimensions
	customDimensions: Partial<Dimensions>; // Custom dimensions provided by the user
	originalDimensions: Dimensions; // Original dimensions of the image

	/**
	 * Constructor to initialize the ImagePropBuilder instance
	 * @param image - Sanity image source
	 * @param client - Sanity client or project details
	 * @param options - Options for custom dimensions and srcset sizes
	 */
	constructor(
		image: SanityImageSource,
		client: SanityClientOrProjectDetails,
		options: GetImagePropsOptions = {}
	) {
		// Ensure the image and client are provided
		if (!image || !client) {
			throw new Error('Sanity image and client are required.');
		}

		// Extract custom options
		const { aspect, srcsetSizes, ...builderOptions } = options;

		// Initialize custom dimensions
		this.customDimensions = {
			aspectRatio: aspect,
			width: builderOptions.width,
			height: builderOptions.height
		};

		// Use default or provided srcset sizes
		this.srcsetBreakpoints = srcsetSizes || DEFAULT_IMAGE_SIZES;

		// Initialize the URL builder with the image and client
		this.urlBuilder = imageUrlBuilder(client).image(image).withOptions(builderOptions);

		// Get original image dimensions
		const originalDims = getImageDimensions(image);
		this.originalDimensions = {
			width: originalDims.width,
			height: originalDims.height,
			aspectRatio: originalDims.width / originalDims.height
		};

		// Calculate output dimensions based on provided options
		const calculatedDims = this.calculateOutputDimensions();
		this.dimensions = {
			width: calculatedDims.outputWidth,
			height: calculatedDims.outputHeight,
			aspectRatio: calculatedDims.outputWidth / calculatedDims.outputHeight
		};

		// Update URL builder with dimensions if a custom aspect ratio is specified
		if (this.customDimensions.aspectRatio) {
			this.urlBuilder = this.urlBuilder.width(this.dimensions.width).height(this.dimensions.height);
		}

		// Generate the srcset string
		this.srcset = this.getSrcset();
	}

	/**
	 * Calculate the output dimensions based on custom and original dimensions
	 * @returns Object containing output width and height
	 */
	private calculateOutputDimensions() {
		// If explicit dimensions are provided, use them
		if (this.customDimensions.width && this.customDimensions.height) {
			return {
				outputWidth: this.customDimensions.width,
				outputHeight: this.customDimensions.height
			};
		}

		// Handle cases where aspect ratio is specified
		if (this.customDimensions.aspectRatio) {
			const calculatedHeight = Math.min(
				this.originalDimensions.height,
				this.originalDimensions.width / this.customDimensions.aspectRatio
			);
			return {
				outputWidth: Math.round(calculatedHeight * this.customDimensions.aspectRatio),
				outputHeight: Math.round(calculatedHeight)
			};
		}

		// TODO: handle aspect + width, aspect + height
		// ...

		// Calculate dimensions based on custom height
		if (this.customDimensions.height) {
			return {
				outputWidth: Math.round(this.customDimensions.height * this.originalDimensions.aspectRatio),
				outputHeight: this.customDimensions.height
			};
		}

		// Calculate dimensions based on custom width
		if (this.customDimensions.width) {
			return {
				outputWidth: this.customDimensions.width,
				outputHeight: Math.round(this.customDimensions.width / this.originalDimensions.aspectRatio)
			};
		}

		// Default to original dimensions if no custom dimensions are provided
		return {
			outputWidth: this.originalDimensions.width,
			outputHeight: this.originalDimensions.height
		};
	}

	/**
	 * Get valid breakpoints for the srcset, ensuring they don't exceed image dimensions
	 * @returns Array of valid breakpoints
	 */
	private getValidBreakpoints() {
		const breakpoints = this.srcsetBreakpoints;
		const customHeight = this.customDimensions.height;

		// Ensure that images with a custom height are included in breakpoints
		if (customHeight && !this.customDimensions.width) {
			return breakpoints.filter(
				(breakpoint) => breakpoint <= customHeight * this.dimensions.aspectRatio
			);
		}

		// Exclude breakpoints larger than the output width
		return breakpoints.filter((breakpoint) => breakpoint <= this.dimensions.width);
	}

	/**
	 * Generate the srcset string for the image
	 * @returns Srcset string or undefined
	 */
	private getSrcset() {
		const breakpoints = this.getValidBreakpoints();

		// If no valid breakpoints, do not include an srcset
		if (!breakpoints.length) {
			return undefined;
		}

		// Map each breakpoint to a URL and combine into a srcset string
		return breakpoints
			.map((breakpoint) => {
				// Calculate height based on aspect ratio if specified
				const needsCustomHeight = this.customDimensions.aspectRatio || this.customDimensions.height;

				if (needsCustomHeight) {
					return this.urlBuilder
						.height(Math.round(breakpoint / this.dimensions.aspectRatio))
						.width(breakpoint)
						.url();
				}

				// Default case
				return this.urlBuilder.width(breakpoint).url();
			})
			.map((url, i) => `${url} ${breakpoints[i]}w`)
			.join(', ');
	}
}
