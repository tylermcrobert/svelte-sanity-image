import type {
	SanityClientOrProjectDetails,
	SanityImageSource,
	SvelteSanityImageProps,
	ValidBuilderOptions
} from './types.js';
import { ImagePropBuilder } from './ImagePropBuilder.js';

type ImageProps = {
	src: string;
	width: number;
	height: number;
	srcset: string | undefined;
};

type EmptyImageProps = Record<keyof ImageProps, undefined>;

export type GetImagePropsOptions = Pick<SvelteSanityImageProps, 'aspect' | 'srcsetSizes'> &
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
	options: GetImagePropsOptions = {}
): ImageProps | EmptyImageProps {
	try {
		const builder = new ImagePropBuilder(image, client, options);

		return {
			src: builder.urlBuilder.url(),
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
