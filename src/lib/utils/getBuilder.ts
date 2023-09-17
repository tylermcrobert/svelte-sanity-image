import type { SanityClient } from '@sanity/client';
import type { SanityImageSource } from './types';
import imageUrlBuilder from '@sanity/image-url';

export default function getBuilder(
	source: SanityImageSource,
	client: SanityClient
) {
	return imageUrlBuilder(client).image(source);
}
