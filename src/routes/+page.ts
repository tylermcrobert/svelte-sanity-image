import { client } from '../sanity.js';

export async function load() {
	return client.fetch(`
    *[_type == 'post'][0]{
      images[]{
        image,
        alt
      }
    }`);
}
