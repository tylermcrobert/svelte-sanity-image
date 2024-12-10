import { describe, it, expect } from 'vitest';
import { getImageProps } from './getImageProps.js';
import { client } from '../sanity.js';
import { BASE_URL, DEFAULT_IMAGE } from '../constants.js';

function flattenStr(str: string) {
	return str.replace(/\s+/g, ' ').trim();
}

describe('getImageProps', () => {
	const image = DEFAULT_IMAGE;

	// Undefined params

	it('trows an error when the image is not provided', () => {
		// @ts-expect-error testing
		expect(() => getImageProps(undefined, undefined)).toThrowError('Sanity image not provided.');
	});

	it('throws an error when the client is not provided', () => {
		// @ts-expect-error testing
		expect(() => getImageProps(image, undefined)).toThrowError(
			'Sanity client or project details not provided.'
		);
	});

	// Invalid params

	it('throws an error when an invalid image is provided.', () => {
		expect(() => getImageProps('image', client)).toThrowError(
			'Invalid asset _ref provided: "image"'
		);
	});

	it('throws an error when an invalid client is provided.', () => {
		// @ts-expect-error testing
		expect(() => getImageProps(image, 'client')).toThrowError();
	});

	// Invalid Options

	it('throws an error when width, height, and aspect are all defined.', () => {
		expect(() =>
			getImageProps(image, client, { height: 1200, width: 1200, aspect: 0.75 })
		).toThrowError('Cannot provide an aspect ratio when width & height are provided.');
	});

	it('should return the correct image properties with base implementation', () => {
		const props = getImageProps(image, client);

		expect(props.src).toBe(BASE_URL);
		expect(props.width).toBe(2400);
		expect(props.height).toBe(1600);

		expect(props.srcset).toBe(
			flattenStr(`
				${BASE_URL}?w=640 640w, 
				${BASE_URL}?w=750 750w, 
				${BASE_URL}?w=828 828w, 
				${BASE_URL}?w=1080 1080w, 
				${BASE_URL}?w=1200 1200w, 
				${BASE_URL}?w=1920 1920w, 
				${BASE_URL}?w=2048 2048w`)
		);
	});

	it('should return the correct image properties with quality', () => {
		const props = getImageProps(image, client, { quality: 50 });

		expect(props.src).toBe(`${BASE_URL}?q=50`);
		expect(props.width).toBe(2400);
		expect(props.height).toBe(1600);

		expect(props.srcset).toBe(
			flattenStr(`
				${BASE_URL}?w=640&q=50 640w, 
				${BASE_URL}?w=750&q=50 750w, 
				${BASE_URL}?w=828&q=50 828w, 
				${BASE_URL}?w=1080&q=50 1080w, 
				${BASE_URL}?w=1200&q=50 1200w, 
				${BASE_URL}?w=1920&q=50 1920w, 
				${BASE_URL}?w=2048&q=50 2048w
			`)
		);
	});

	it('should build an image correctly with a defined aspect (Portrait)', () => {
		const props = getImageProps(image, client, { aspect: 0.75 });

		expect(props.src).toBe(`${BASE_URL}?rect=600,0,1200,1600&w=1200&h=1600`);
		expect(props.width).toBe(1200);
		expect(props.height).toBe(1600);

		expect(props.srcset).toBe(
			flattenStr(`
				${BASE_URL}?rect=600,0,1200,1600&w=640&h=853 640w, 
				${BASE_URL}?rect=600,0,1200,1600&w=750&h=1000 750w, 
				${BASE_URL}?rect=600,0,1200,1600&w=828&h=1104 828w, 
				${BASE_URL}?rect=600,0,1200,1600&w=1080&h=1440 1080w, 
				${BASE_URL}?rect=600,0,1200,1600&w=1200&h=1600 1200w`)
		);
	});

	it('Handles DPR correctly', () => {
		// TODO
	});
});
