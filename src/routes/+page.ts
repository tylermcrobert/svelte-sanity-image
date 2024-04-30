import type { SanityImageSource } from '$lib';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import { client } from '../sanity';

const imagesQuery = `*[_type == 'post'][0]{
	"raw": images[]{
		image,
		alt
	},
	"refs": images[]{
		"image": image.asset,
		alt
	},
	"extended": images[]{
		"image":image.asset->
	}
}`;

export type ImagesQuery = {
	raw: {
		image: SanityImageSource;
		alt: string;
	}[];
	refs: {
		image: {
			_ref: string;
			_type: 'reference';
		};
		alt: string;
	}[];
	extended: {
		image: SanityAsset;
		alt: string;
	}[];
};

export async function load() {
	const images: ImagesQuery = await client.fetch(imagesQuery);
	return images;
}
