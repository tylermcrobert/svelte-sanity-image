import { client, imagesQuery, type ImagesQuery } from '../sanity';

export async function load() {
	const images: ImagesQuery = await client.fetch(imagesQuery);
	return { images };
}
