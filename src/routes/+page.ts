import type { SanityImageObject } from '$lib';
import { client } from '../sanity';

const imagesQuery = `*[_type == 'post'][0].images`;

export type ImagesQuery = { image: SanityImageObject; alt: string }[];

export async function load() {
	const images: ImagesQuery = await client.fetch(imagesQuery);
	return { images };
}
