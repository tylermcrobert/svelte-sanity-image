import type { GetImagePropsOptions } from './getImageProps.js';
import type { SanityClientOrProjectDetails, SanityImageSource } from './types.js';
import imageUrlBuilder from '@sanity/image-url';
import { DEFAULT_IMAGE_SIZES } from './constants.js';
import { getImageDimensions } from './getImageDimensions.js';

type Dimensions = {
	width: number;
	height: number;
	aspect: number;
};

/**
 * Class that takes in props from the SvelteSanityImage component
 */
export class ImagePropBuilder {
	options: GetImagePropsOptions;
	image: SanityImageSource;
	client: SanityClientOrProjectDetails;

	srcset: string | undefined; // Srcset string
	src: string;
	dimensions: Dimensions; // Final dimensions

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

		this.image = image;
		this.options = options;
		this.client = client;

		const { width, height } = this.calculateImageDimensions();

		this.dimensions = {
			width,
			height,
			aspect: width / height
		};

		this.srcset = this.getSrcset();
		this.src = this.getSrc();
	}

	/**
	 * Calculate the output dimensions based on custom and original dimensions
	 *
	 * @description Lorme ipsum dolor sit maet
	 * @returns Object containing output width and height
	 *
	 * @todo Handle use cases where width + aspect or height + aspect are set
	 */
	private calculateImageDimensions() {
		const originalDims = getImageDimensions(this.image);
		const originalAspect = originalDims.width / originalDims.height;
		const { width, height, aspect } = this.options;

		// If explicit dimensions are provided, use them
		if (width && height) {
			return {
				width: width,
				height: height
			};
		}

		// Handle cases where aspect ratio is specified
		if (aspect) {
			const calculatedHeight = Math.min(originalDims.height, originalDims.width / aspect);

			return {
				width: Math.round(calculatedHeight * aspect),
				height: Math.round(calculatedHeight)
			};
		}

		// Calculate dimensions based on custom height
		if (height) {
			return {
				width: Math.round(height * originalAspect),
				height: height
			};
		}

		// Calculate dimensions based on custom width
		if (width) {
			return {
				width: width,
				height: Math.round(width / originalAspect)
			};
		}

		// Default to original dimensions if no custom dimensions are provided
		return {
			width: originalDims.width,
			height: originalDims.height
		};
	}

	/**
	 * Get valid breakpoints for the srcset,
	 *
	 * @description This filters out unnessesary breakpoints
	 * @returns Array of valid breakpoints
	 */
	private getValidBreakpoints() {
		const breakpoints = this.options.srcsetSizes || DEFAULT_IMAGE_SIZES;
		const customHeight = this.options.height;

		// Ensure that images with a custom height are included in breakpoints
		if (customHeight && !this.options.width) {
			return breakpoints.filter(
				(breakpoint) => breakpoint <= customHeight * this.dimensions.aspect
			);
		}

		// Exclude breakpoints larger than the output width
		return breakpoints.filter((breakpoint) => breakpoint <= this.dimensions.width);
	}

	/**
	 * Get configured Sanity Image URL Builder

	 * @returns Initalized URL Builder with input config
	 */
	private getUrlBuilder() {
		return imageUrlBuilder(this.client).image(this.image).withOptions(this.options);
	}

	/**
	 * Gets a valid image Src
	 *
	 * @description Intercepts the default builder config with a width and height if the user has defined an aspect ratio
	 * @returns Proper image src
	 */
	private getSrc() {
		let builder = this.getUrlBuilder();

		// If an aspect is set, rebuild the builder with the calculated dimensions
		if (this.options.aspect) {
			builder = builder.width(this.dimensions.width).height(this.dimensions.height);
		}

		return builder.url();
	}

	/**
	 * Generate the srcset string for the image
	 *
	 * @description TODO
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
				let builder = this.getUrlBuilder().width(breakpoint);

				// Calculate height based on aspect ratio if specified
				const needsCustomHeight = this.options.aspect || this.options.height;
				if (needsCustomHeight) {
					builder = builder.height(Math.round(breakpoint / this.dimensions.aspect));
				}

				return builder.url();
			})
			.map((url, i) => `${url} ${breakpoints[i]}w`)
			.join(', ');
	}
}
