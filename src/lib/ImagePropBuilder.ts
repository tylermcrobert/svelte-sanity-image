// Import required types and modules
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder.js';
import type { GetImagePropsOptions } from './getImageProps.js';
import type { SanityClientOrProjectDetails, SanityImageSource } from './types.js';
import imageUrlBuilder from '@sanity/image-url';
import { DEFAULT_IMAGE_SIZES } from './constants.js';
import { getImageDimensions } from './getImageDimensions.js';

// Class to build image properties and srcset for Sanity images
export class ImagePropBuilder {
	urlBuilder: ImageUrlBuilder; // Builder for Sanity image URLs
	srcsetBreakpoints: number[]; // Array of breakpoints for srcset generation

	srcset: string | undefined; // Srcset string
	width: number; // Final width of the image
	height: number; // Final height of the image
	aspectRatio: number; // Final aspect ratio of the image

	// Custom dimensions provided by the user
	customWidth: number | undefined;
	customHeight: number | undefined;
	customAspectRatio: number | undefined;

	// Original dimensions of the image
	originalHeight: number;
	originalWidth: number;
	originalAspectRatio: number;

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

		// Set custom aspect ratio, width, and height
		this.customAspectRatio = aspect;
		this.customWidth = builderOptions.width;
		this.customHeight = builderOptions.height;

		// Use default or provided srcset sizes
		this.srcsetBreakpoints = srcsetSizes || DEFAULT_IMAGE_SIZES;

		// Initialize the URL builder with the image and client
		this.urlBuilder = imageUrlBuilder(client).image(image).withOptions(builderOptions);

		// Get original image dimensions
		const originalDims = getImageDimensions(image);
		this.originalWidth = originalDims.width;
		this.originalHeight = originalDims.height;
		this.originalAspectRatio = originalDims.width / originalDims.height;

		// Calculate output dimensions based on provided options
		const calculatedDims = this.calculateOutputDimensions();
		this.width = calculatedDims.outputWidth;
		this.height = calculatedDims.outputHeight;
		this.aspectRatio = calculatedDims.outputWidth / calculatedDims.outputHeight;

		// Update URL builder with dimensions if a custom aspect ratio is specified
		if (this.customAspectRatio) {
			this.urlBuilder = this.urlBuilder.width(this.width).height(this.height);
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
		if (this.customWidth && this.customHeight) {
			return {
				outputWidth: this.customWidth,
				outputHeight: this.customHeight
			};
		}

		// Handle cases where aspect ratio is specified
		if (this.customAspectRatio) {
			const calculatedHeight = Math.min(
				this.originalHeight,
				this.originalWidth / this.customAspectRatio
			);
			return {
				outputWidth: Math.round(calculatedHeight * this.customAspectRatio),
				outputHeight: Math.round(calculatedHeight)
			};
		}

		// TODO: handle aspect + width, aspect + height
		// ...

		// Calculate dimensions based on custom height
		if (this.customHeight) {
			return {
				outputWidth: Math.round(this.customHeight * this.originalAspectRatio),
				outputHeight: this.customHeight
			};
		}

		// Calculate dimensions based on custom width
		if (this.customWidth) {
			return {
				outputWidth: this.customWidth,
				outputHeight: Math.round(this.customWidth / this.originalAspectRatio)
			};
		}

		// Default to original dimensions if no custom dimensions are provided
		return {
			outputWidth: this.originalWidth,
			outputHeight: this.originalHeight
		};
	}

	/**
	 * Get valid breakpoints for the srcset, ensuring they don't exceed image dimensions
	 * @returns Array of valid breakpoints
	 */
	private getValidBreakpoints() {
		const breakpoints = this.srcsetBreakpoints;
		const customHeight = this.customHeight;

		// Ensure that images with a custom height is included in breakpoints
		if (customHeight && !this.customWidth) {
			return breakpoints.filter((breakpoint) => breakpoint <= customHeight * this.aspectRatio);
		}

		// Exclude breakpoints larger than the output width
		return breakpoints.filter((breakpoint) => breakpoint <= this.width);
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
				if (this.customAspectRatio) {
					const calculatedHeight = Math.round(breakpoint / this.customAspectRatio);
					return this.urlBuilder.height(calculatedHeight).width(breakpoint).url();
				}

				// Calculate the widths for a requested custom height
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
