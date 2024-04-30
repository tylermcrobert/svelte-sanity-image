import type { SanityImageObject } from '$lib';
export declare const client: import("@sanity/client").SanityClient;
export declare const imagesQuery = "*[_type == 'post'][0].images";
export type ImagesQuery = {
    image: SanityImageObject;
    alt: string;
}[];
