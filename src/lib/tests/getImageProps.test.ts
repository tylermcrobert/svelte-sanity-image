import { describe, it, expect } from 'vitest';
import { getImageProps } from '../getImageProps.js';
import { client } from '../../sanity.js';
import { BASE_URL, DEFAULT_IMAGE } from './constants.js';

function flattenStr(str: string) {
	return str.replace(/\s+/g, ' ').trim();
}

describe('getImageProps', () => {
	const image = DEFAULT_IMAGE;

	it('throws an error when the client is not provided', () => {
		// TODO
	});

	it('trows an error when the image is not provided', () => {
		// TODO
	});

	it('should return the correct image properties with base implementation', () => {
		const props = getImageProps(image, client);

		expect(props.src).toBe(BASE_URL);

		expect(props.srcset).toBe(
			flattenStr(`
				${BASE_URL}?w=640 640w,
				${BASE_URL}?w=750 750w,
				${BASE_URL}?w=828 828w,
				${BASE_URL}?w=1080 1080w,
				${BASE_URL}?w=1200 1200w`)
		);

		expect(props.width).toBe(1200);
		expect(props.height).toBe(800);
	});

	it('should return the correct image properties with quality', () => {
		const props = getImageProps(image, client, { quality: 50 });

		expect(props.src).toBe(`${BASE_URL}?q=50`);

		expect(props.srcset).toBe(
			flattenStr(`
				${BASE_URL}?w=640&q=50 640w, 
				${BASE_URL}?w=750&q=50 750w, 
				${BASE_URL}?w=828&q=50 828w, 
				${BASE_URL}?w=1080&q=50 1080w, 
				${BASE_URL}?w=1200&q=50 1200w`)
		);

		expect(props.width).toBe(1200);
		expect(props.height).toBe(800);
	});

	it('should build an image correctly with a defined aspect', () => {
		// TODO
	});

	it('throws an error when width, height, and aspect are all defined.', () => {
		// TODO
	});
});
