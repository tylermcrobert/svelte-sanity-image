import getImageDimensions from './getImageDimensions';
import getSrcset from './getSrcset';
import type { ResponsiveImageConfig, ResponsiveImageProps } from './types';
import getBuilder from './getBuilder';

export default function getImageProps({
	image,
	sizes,
	quality,
	enforcedAspect,
	client
}: ResponsiveImageConfig): ResponsiveImageProps {
	const { aspectRatio } = getImageDimensions(image);
	const aspect = enforcedAspect || aspectRatio;

	return {
		src: getBuilder(image, client).url(),
		srcset: getSrcset(image, client, { quality, enforcedAspect, client }),
		sizes,
		style: `aspect-ratio: ${aspect}`
	};
}
