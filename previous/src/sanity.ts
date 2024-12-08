import { createClient } from '@sanity/client';

export const client = createClient({
	projectId: '7ehtrhwv',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2023-05-19'
});
