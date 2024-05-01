/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import { getDimsFromRefString } from '../getImageDimensions';
import { DEFAULT_REF_ID } from '$lib/tests/constants';

describe('getDimsFromId', () => {
	it('Extracts the correct dimensions from the asset _ref', () => {
		expect(getDimsFromRefString(DEFAULT_REF_ID)).toEqual({
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
				'image-d8d83c64bb2144283a2644afd2390f2b5e439041-8025xinvalid-jpg'
			)
		).toThrowError(
			'Invalid dimensions in _ref string: "image-d8d83c64bb2144283a2644afd2390f2b5e439041-8025xinvalid-jpg"'
		);
	});
});
