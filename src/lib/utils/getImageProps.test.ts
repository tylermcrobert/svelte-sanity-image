import { describe, it, expect } from 'vitest';
import getImageProps from './getImageProps';
import { client } from '../../sanity';
import { BASE_URL, DEFAULT_IMAGE } from '$lib/tests/constants';

describe('getImageProps', () => {
	const image = DEFAULT_IMAGE;

	it('should return the correct image properties', () => {
		const props = getImageProps({ image, client });

		expect(props.src).toBe(BASE_URL);

		expect(props.srcset).toBe(
			`
			${BASE_URL}?w=640 640w, 
			${BASE_URL}?w=750 750w, 
			${BASE_URL}?w=828 828w, 
			${BASE_URL}?w=1080 1080w, 
			${BASE_URL}?w=1200 1200w, 
			${BASE_URL}?w=1920 1920w, 
			${BASE_URL}?w=2048 2048w, 
			${BASE_URL}?w=3840 3840w`
				.replace(/\s+/g, ' ')
				.trim()
		);

		expect(props.width).toBe(8025);
		expect(props.height).toBe(5350);
	});
});
