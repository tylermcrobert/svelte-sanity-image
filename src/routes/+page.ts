import { createClient } from '@sanity/client';
import groq from 'groq';

const client = createClient({
	projectId: '4kvint4g',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2023-05-19'
});

export async function load() {
	const images = await client.fetch(groq`
  *[_type  == 'site'][0]{
    'images': overview->images,
  }
`);

	return { ...images, client };
}
