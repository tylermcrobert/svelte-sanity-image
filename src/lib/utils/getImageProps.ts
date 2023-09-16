import { urlFor } from '$lib/sanity/client';
import getImageDimensions from './getImageDimensions';
import getSrcset from './getSrcset';
import type { ResponsiveImageConfig, ResponsiveImageProps } from './types';

export default function getImageProps({
	image,
	sizes,
	quality,
	enforcedAspect
}: ResponsiveImageConfig): ResponsiveImageProps {
	const { aspectRatio } = getImageDimensions(image);
	const aspect = enforcedAspect || aspectRatio;

	return {
		src: urlFor(image).url(),
		srcset: getSrcset(image, { quality, enforcedAspect }),
		sizes,
		style: `aspect-ratio: ${aspect}`
	};
}
