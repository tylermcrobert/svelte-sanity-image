import { describe, it, expect } from 'vitest';
import { getImageProps } from './getImageProps.js';
import { client } from '../sanity.js';
import { BASE_URL, DEFAULT_IMAGE } from '../constants.js';

function flattenStr(str: string) {
	return str.replace(/\s+/g, ' ').trim();
}

describe('getImageProps', () => {
	// describe('Error Handling', () => {
	// 	it('throws an error when the image is not provided', () => {
	// 		// @ts-expect-error testing
	// 		expect(getImageProps(undefined, undefined)).toEqual({
	// 			height: undefined,
	// 			src: undefined,
	// 			srcset: undefined,
	// 			width: undefined
	// 		});
	// 	});

	// 	it('throws an error when an invalid image is provided', () => {
	// 		expect(getImageProps('DEFAULT_IMAGE', client)).toEqual({
	// 			height: undefined,
	// 			src: undefined,
	// 			srcset: undefined,
	// 			width: undefined
	// 		});
	// 	});

	// 	it('throws an error when the client is not provided', () => {
	// 		// @ts-expect-error testing
	// 		expect(getImageProps(DEFAULT_IMAGE, undefined)).toEqual({
	// 			height: undefined,
	// 			src: undefined,
	// 			srcset: undefined,
	// 			width: undefined
	// 		});
	// 	});

	// 	it('throws an error when an invalid client is provided', () => {
	// 		// @ts-expect-error testing
	// 		expect(getImageProps(DEFAULT_IMAGE, 'invalid-client')).toEqual({
	// 			height: undefined,
	// 			src: undefined,
	// 			srcset: undefined,
	// 			width: undefined
	// 		});
	// 	});

	// 	it('throws an error when width, height, and aspect are all defined', () => {
	// 		expect(
	// 			getImageProps(DEFAULT_IMAGE, client, { height: 1200, width: 1200, aspect: 0.75 })
	// 		).toEqual({
	// 			height: undefined,
	// 			src: undefined,
	// 			srcset: undefined,
	// 			width: undefined
	// 		});
	// 	});
	// });

	describe('Valid Cases', () => {
		it('returns the correct image properties with base implementation', () => {
			const props = getImageProps(DEFAULT_IMAGE, client);

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
					${BASE_URL}?w=2048 2048w
				`)
			);
		});

		it('Returns the correct image properties with quality', () => {
			const props = getImageProps(DEFAULT_IMAGE, client, { quality: 50 });

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

		describe('Aspect Ratios', () => {
			it('Correctly renders portrait aspect', () => {
				const props = getImageProps(DEFAULT_IMAGE, client, { aspect: 0.75 });

				expect(props.src).toBe(`${BASE_URL}?rect=600,0,1200,1600&w=1200&h=1600`);
				expect(props.width).toBe(1200);
				expect(props.height).toBe(1600);

				expect(props.srcset).toBe(
					flattenStr(`
					${BASE_URL}?rect=600,0,1200,1600&w=640&h=853 640w, 
					${BASE_URL}?rect=600,0,1200,1600&w=750&h=1000 750w, 
					${BASE_URL}?rect=600,0,1200,1600&w=828&h=1104 828w, 
					${BASE_URL}?rect=600,0,1200,1600&w=1080&h=1440 1080w, 
					${BASE_URL}?rect=600,0,1200,1600&w=1200&h=1600 1200w
				`)
				);
			});

			it('Correctly renders landscape aspect', () => {
				const props = getImageProps(DEFAULT_IMAGE, client, { aspect: 1.25 });

				expect(props.src).toBe(`${BASE_URL}?rect=200,0,2000,1600&w=2000&h=1600`);
				expect(props.width).toBe(2000);
				expect(props.height).toBe(1600);

				expect(props.srcset).toBe(
					flattenStr(`
						${BASE_URL}?rect=200,0,2000,1600&w=640&h=512 640w,
						${BASE_URL}?rect=200,0,2000,1600&w=750&h=600 750w, 
						${BASE_URL}?rect=200,0,2001,1600&w=828&h=662 828w, 
						${BASE_URL}?rect=200,0,2000,1600&w=1080&h=864 1080w, 
						${BASE_URL}?rect=200,0,2000,1600&w=1200&h=960 1200w, 
						${BASE_URL}?rect=200,0,2000,1600&w=1920&h=1536 1920w
					`)
				);
			});

			it('Correctly renders square aspect', () => {
				const props = getImageProps(DEFAULT_IMAGE, client, { aspect: 1 });

				expect(props.src).toBe(`${BASE_URL}?rect=400,0,1600,1600&w=1600&h=1600`);
				expect(props.width).toBe(1600);
				expect(props.height).toBe(1600);

				expect(props.srcset).toBe(
					flattenStr(
						`${BASE_URL}?rect=400,0,1600,1600&w=640&h=640 640w,
						${BASE_URL}?rect=400,0,1600,1600&w=750&h=750 750w, 
						${BASE_URL}?rect=400,0,1600,1600&w=828&h=828 828w, 
						${BASE_URL}?rect=400,0,1600,1600&w=1080&h=1080 1080w, 
						${BASE_URL}?rect=400,0,1600,1600&w=1200&h=1200 1200w`
					)
				);
			});
		});

		it('Correcetly renders Aspect + Width', () => {
			const props = getImageProps(DEFAULT_IMAGE, client, { aspect: 1.5, width: 800 });

			expect(props.width).toBe(800);
			expect(props.height).toBe(533);
		});

		it('Correcetly renders Aspect + Height', () => {
			const props = getImageProps(DEFAULT_IMAGE, client, { aspect: 1.5, height: 400 });

			expect(props.width).toBe(600);
			expect(props.height).toBe(400);
		});

		it('Correcetly renders Aspect + Height', () => {
			const props = getImageProps(DEFAULT_IMAGE, client, { aspect: 1.5, height: 400, width: 400 });

			expect(props.src).toBe(undefined);
			expect(props.width).toBe(undefined);
			expect(props.height).toBe(undefined);
			expect(props.srcset).toBe(undefined);
		});

		it('handles DPR correctly', () => {
			// TODO: Add DPR handling logic
		});
	});
});
