import type { SanityClient } from '@sanity/client';
import type { HTMLImgAttributes } from 'svelte/elements';
import type {
	SanityImageSource,
	SanityImageObject
} from '@sanity/image-url/lib/types/types.d.ts';

/**
 * Props for the image component
 */

export type Props = {
	image: SanityImageSource;
	sizes: string;
	client: SanityClient;
	alt: string;

	quality?: number;
	aspect?: number;
	onLoad?: EventCallback;
	autoFormat?: boolean;
} & HTMLImgAttributes;

type EventCallbackPayload = { target: HTMLImageElement };
type EventCallback = (event: EventCallbackPayload) => void;

/**
 * Export SanityImage
 */

export { SanityImageSource, SanityImageObject };
