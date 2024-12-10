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

		const calculatedDims = this.calculateOutputDimensions();

		this.dimensions = {
			...calculatedDims,
			aspect: calculatedDims.width / calculatedDims.height
		};

		this.srcset = this.getSrcset();
		this.src = this.getUrlBuilder().url();
	}

	/**
	 * Calculate the output dimensions based on custom and original dimensions
	 * @returns Object containing output width and height
	 */
	private calculateOutputDimensions() {
		const originalDims = getImageDimensions(this.image);
		const originalAspect = originalDims.width / originalDims.height;

		// If explicit dimensions are provided, use them
		if (this.options.width && this.options.height) {
			return {
				width: this.options.width,
				height: this.options.height
			};
		}

		// Handle cases where aspect ratio is specified
		if (this.options.aspect) {
			const calculatedHeight = Math.min(
				originalDims.height,
				originalDims.width / this.options.aspect
			);
			return {
				width: Math.round(calculatedHeight * this.options.aspect),
				height: Math.round(calculatedHeight)
			};
		}

		// TODO: handle aspect + width, aspect + height
		// ...

		// Calculate dimensions based on custom height
		if (this.options.height) {
			return {
				width: Math.round(this.options.height * originalAspect),
				height: this.options.height
			};
		}

		// Calculate dimensions based on custom width
		if (this.options.width) {
			return {
				width: this.options.width,
				height: Math.round(this.options.width / originalAspect)
			};
		}

		// Default to original dimensions if no custom dimensions are provided
		return {
			width: originalDims.width,
			height: originalDims.height
		};
	}

	/**
	 * Get valid breakpoints for the srcset, ensuring they don't exceed image dimensions
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

	private getUrlBuilder() {
		let urlBuilder = imageUrlBuilder(this.client).image(this.image).withOptions(this.options);
		if (this.options.aspect) {
			urlBuilder = urlBuilder.width(this.dimensions.width).height(this.dimensions.height);
		}

		return urlBuilder;
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
