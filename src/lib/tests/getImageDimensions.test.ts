/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import getImageDimensions, {
	getDimsFromRefString
} from '../utils/getImageDimensions';
import { DEFAULT_IMAGE, DEFAULT_REF } from '$lib/tests/constants';

describe('getDimsFromId', () => {
	it('Extracts the correct dimensions from the asset _ref', () => {
		expect(getDimsFromRefString(DEFAULT_REF)).toEqual({
			width: 8025,
			height: 5350,
			aspectRatio: 1.5
		});
	});

	it('Throws an error if the asset _ref is invalid', () => {
		expect(() => getDimsFromRefString('')).toThrowError(
			'Invalid asset _ref provided: ""'
		);
	});

	it('Throws an error if dimensions string is invalid', () => {
		expect(() =>
			getDimsFromRefString(
				'image-d8d83c64bb2144283a2644afd2390f2b5e439041-8025-jpg'
			)
		).toThrowError(
			'Invalid dimensions in _ref string: "image-d8d83c64bb2144283a2644afd2390f2b5e439041-8025-jpg"'
		);
	});
});

describe('getImageDimensions', () => {
	it('Gets the correct image dimensions', () => {
		expect(getImageDimensions(DEFAULT_IMAGE)).toEqual({
			aspectRatio: 1.5,
			height: 5350,
			width: 8025
		});
	});

	it('Throws an error if the image input is invalid', () => {
		expect(() => getImageDimensions({} as any)).toThrowError(
			'Invalid image object provided'
		);
	});
});
