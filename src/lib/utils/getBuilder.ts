import type { SanityClient } from '@sanity/client';
import type { SanityImage } from './types';
import imageUrlBuilder from '@sanity/image-url';

export default function getBuilder(source: SanityImage, client: SanityClient) {
	return imageUrlBuilder(client).image(source);
}
