import type { SanityClient } from '@sanity/client';
import type {
	SanityImageSource,
	SanityImageObject
} from '@sanity/image-url/lib/types/types.d.ts';

/**
 * Props for the image component
 */

export type SvelteSanityImageProps = {
	image: SanityImageSource;
	sizes: string;
	client: SanityClient;
	alt: string;

	quality?: number;
	enforcedAspect?: number;
	onLoad?: EventCallback;
	autoFormat?: boolean;
};

type EventCallbackPayload = { target: HTMLImageElement };
type EventCallback = (event: EventCallbackPayload) => void;

/**
 * Export SanityImage
 */

export { SanityImageSource, SanityImageObject };
