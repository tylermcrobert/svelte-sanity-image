import { describe, it, expect } from 'vitest';
import getImageProps from './getImageProps';
import { client } from '../../sanity';
import { BASE_URL, DEFAULT_IMAGE } from '$lib/tests/constants';

function flattenStr(str: string) {
	return str.replace(/\s+/g, ' ').trim();
}

describe('getImageProps', () => {
	const image = DEFAULT_IMAGE;

	it('should return the correct image properties with base implementation', () => {
		const props = getImageProps({ image, client });

		expect(props.src).toBe(BASE_URL);

		expect(props.srcset).toBe(
			flattenStr(`
			${BASE_URL}?w=640 640w, 
			${BASE_URL}?w=750 750w, 
			${BASE_URL}?w=828 828w, 
			${BASE_URL}?w=1080 1080w, 
			${BASE_URL}?w=1200 1200w, 
			${BASE_URL}?w=1920 1920w, 
			${BASE_URL}?w=2048 2048w, 
			${BASE_URL}?w=3840 3840w`)
		);

		expect(props.width).toBe(8025);
		expect(props.height).toBe(5350);
	});

	it('should return the correct image properties with quality', () => {
		const props = getImageProps({ image, client, quality: 50 });

		expect(props.src).toBe(`${BASE_URL}?q=50`);

		expect(props.srcset).toBe(
			flattenStr(`
			${BASE_URL}?w=640&q=50 640w, 
			${BASE_URL}?w=750&q=50 750w, 
			${BASE_URL}?w=828&q=50 828w, 
			${BASE_URL}?w=1080&q=50 1080w, 
			${BASE_URL}?w=1200&q=50 1200w, 
			${BASE_URL}?w=1920&q=50 1920w, 
			${BASE_URL}?w=2048&q=50 2048w, 
			${BASE_URL}?w=3840&q=50 3840w`)
		);

		expect(props.width).toBe(8025);
		expect(props.height).toBe(5350);
	});
});
