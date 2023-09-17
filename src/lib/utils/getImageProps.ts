import getImageDimensions from './getImageDimensions';
import getSrcset from './getSrcset';
import type { GetImagePropsReturn, GetImagePropsOptions } from './types';
import getBuilder from './getBuilder';

export default function getImageProps({
	image,
	quality,
	enforcedAspect,
	client
}: GetImagePropsOptions): GetImagePropsReturn {
	const { width, height } = getImageDimensions(image);

	return {
		src: getBuilder(image, client).url(),
		srcset: getSrcset(image, client, { quality, enforcedAspect, client }),
		width,
		height
	};
}
