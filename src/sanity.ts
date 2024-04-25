import { createClient } from '@sanity/client';
import type { SanityImageSource } from '$lib/utils/types.ts';

export const client = createClient({
	projectId: '7ehtrhwv',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2023-05-19'
});

export const imagesQuery = `*[_type == 'post'][0].images`;

export type ImagesQuery = { image: SanityImageSource; alt: string }[];
