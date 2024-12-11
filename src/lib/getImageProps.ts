import type { SanityClientOrProjectDetails, SanityImageSource } from './types.js';
import { ImagePropBuilder, type ImagePropBuilderOptions } from './ImagePropBuilder.js';

type ImageProps = {
	src: string;
	width: number;
	height: number;
	srcset: string | undefined;
};

type EmptyImageProps = Record<keyof ImageProps, undefined>;

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
	options: ImagePropBuilderOptions = {}
): ImageProps | EmptyImageProps {
	try {
		const builder = new ImagePropBuilder(image, client, options);

		return {
			src: builder.src,
			srcset: builder.srcset,
			width: builder.dimensions.width,
			height: builder.dimensions.height
		};
	} catch (error) {
		console.error(error);

		return {
			src: undefined,
			srcset: undefined,
			width: undefined,
			height: undefined
		};
	}
}
