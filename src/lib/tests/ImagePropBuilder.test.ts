import { describe, it, expect } from 'vitest';
import { client } from '../../sanity.js';
import { BASE_URL, DEFAULT_IMAGE } from '../../constants.js';
import { ImagePropBuilder } from './../ImagePropBuilder.js';

function flattenStr(str: string) {
	return str.replace(/\s+/g, ' ').trim();
}

describe('getImageProps', () => {
	it('Correctly renders with base implementation', () => {
		const { props } = new ImagePropBuilder(DEFAULT_IMAGE, client);

		expect(props.width).toBe(2400);
		expect(props.height).toBe(1600);
		expect(props.src).toBe(BASE_URL);
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

	it('Correctly renders with quality prop', () => {
		const { props } = new ImagePropBuilder(DEFAULT_IMAGE, client, { quality: 50 });

		expect(props.width).toBe(2400);
		expect(props.height).toBe(1600);
		expect(props.src).toBe(`${BASE_URL}?q=50`);
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
			const { props } = new ImagePropBuilder(DEFAULT_IMAGE, client, { aspect: 2 / 3 });

			expect(props.width).toBe(2400);
			expect(props.height).toBe(3600);
			expect(props.src).toBe(`${BASE_URL}?rect=667,0,1067,1600&w=2400&h=3600`);

			expect(props.srcset).toBe(
				flattenStr(`
					${BASE_URL}?rect=667,0,1067,1600&w=640&h=960 640w, 
					${BASE_URL}?rect=667,0,1067,1600&w=750&h=1125 750w, 
					${BASE_URL}?rect=667,0,1067,1600&w=828&h=1242 828w, 
					${BASE_URL}?rect=667,0,1067,1600&w=1080&h=1620 1080w, 
					${BASE_URL}?rect=667,0,1067,1600&w=1200&h=1800 1200w, 
					${BASE_URL}?rect=667,0,1067,1600&w=1920&h=2880 1920w, 
					${BASE_URL}?rect=667,0,1067,1600&w=2048&h=3072 2048w
				`)
			);
		});

		it('Correctly renders landscape aspect', () => {
			const { props } = new ImagePropBuilder(DEFAULT_IMAGE, client, { aspect: 3 / 2 });

			expect(props.width).toBe(2400);
			expect(props.height).toBe(1600);
			expect(props.src).toBe(`${BASE_URL}?w=2400&h=1600`);

			expect(props.srcset).toBe(
				flattenStr(
					`${BASE_URL}?rect=1,0,2398,1600&w=640&h=427 640w, 
					${BASE_URL}?w=750&h=500 750w, 
					${BASE_URL}?w=828&h=552 828w, 
					${BASE_URL}?w=1080&h=720 1080w, 
					${BASE_URL}?w=1200&h=800 1200w, 
					${BASE_URL}?w=1920&h=1280 1920w, 
					${BASE_URL}?w=2048&h=1365 2048w`
				)
			);
		});

		it('Correctly renders square aspect', () => {
			const { props } = new ImagePropBuilder(DEFAULT_IMAGE, client, { aspect: 1 });

			expect(props.width).toBe(2400);
			expect(props.height).toBe(2400);
			expect(props.src).toBe(`${BASE_URL}?rect=400,0,1600,1600&w=2400&h=2400`);
			expect(props.srcset).toBe(
				flattenStr(`
					${BASE_URL}?rect=400,0,1600,1600&w=640&h=640 640w, 
					${BASE_URL}?rect=400,0,1600,1600&w=750&h=750 750w, 
					${BASE_URL}?rect=400,0,1600,1600&w=828&h=828 828w, 
					${BASE_URL}?rect=400,0,1600,1600&w=1080&h=1080 1080w, 
					${BASE_URL}?rect=400,0,1600,1600&w=1200&h=1200 1200w, 
					${BASE_URL}?rect=400,0,1600,1600&w=1920&h=1920 1920w, 
					${BASE_URL}?rect=400,0,1600,1600&w=2048&h=2048 2048w
				`)
			);
		});

		it('Correctly renders square aspect with fit=crop and crop=entropy', () => {
			const { props } = new ImagePropBuilder(DEFAULT_IMAGE, client, {
				aspect: 1,
				fit: 'crop',
				crop: 'entropy'
			});

			expect(props.width).toBe(2400);
			expect(props.height).toBe(2400);
			expect(props.src).toBe(`${BASE_URL}?w=2400&h=2400&fit=crop&crop=entropy`);
			expect(props.srcset).toBe(
				flattenStr(`
					${BASE_URL}?w=640&h=640&fit=crop&crop=entropy 640w, 
					${BASE_URL}?w=750&h=750&fit=crop&crop=entropy 750w, 
					${BASE_URL}?w=828&h=828&fit=crop&crop=entropy 828w, 
					${BASE_URL}?w=1080&h=1080&fit=crop&crop=entropy 1080w, 
					${BASE_URL}?w=1200&h=1200&fit=crop&crop=entropy 1200w, 
					${BASE_URL}?w=1920&h=1920&fit=crop&crop=entropy 1920w, 
					${BASE_URL}?w=2048&h=2048&fit=crop&crop=entropy 2048w
				`)
			);
		});

		it('Correctly renders Aspect + Width', () => {
			const { props } = new ImagePropBuilder(DEFAULT_IMAGE, client, { aspect: 3 / 2, width: 800 });

			expect(props.width).toBe(800);
			expect(props.height).toBe(533);
			expect(props.src).toBe(`${BASE_URL}?rect=0,1,2400,1599&w=800&h=533`);
			expect(props.srcset).toBe(
				flattenStr(`
					${BASE_URL}?rect=0,1,2400,1598&w=640&h=426 640w, 
					${BASE_URL}?w=750&h=500 750w
			`)
			);
		});

		it('Correctly renders Aspect + Height', () => {
			const { props } = new ImagePropBuilder(DEFAULT_IMAGE, client, { aspect: 3 / 2, height: 600 });

			expect(props.width).toBe(900);
			expect(props.height).toBe(600);
			expect(props.src).toBe(`${BASE_URL}?w=900&h=600`);
			expect(props.srcset).toBe(
				flattenStr(`
					${BASE_URL}?rect=1,0,2398,1600&w=640&h=427 640w, 
					${BASE_URL}?w=750&h=500 750w, 
					${BASE_URL}?w=828&h=552 828w
			`)
			);
		});
	});

	it('Throws error when user defines width, height, aspect', () => {
		expect(
			() =>
				new ImagePropBuilder(DEFAULT_IMAGE, client, {
					aspect: 1.5,
					height: 400,
					width: 400
				})
		).toThrowError('Cannot define width, height, and aspect');
	});
});
