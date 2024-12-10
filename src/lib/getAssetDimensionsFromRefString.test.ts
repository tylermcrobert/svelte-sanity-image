import { describe, it, expect } from 'vitest';
import { TEST_IMAGE_REF_ID } from '../constants.js';
import { getAssetDimensionsFromRefString } from '$lib/getAssetDimensionsFromRefString.js';

describe('getDimsFromId', () => {
	it('Extracts the correct dimensions from the asset _ref', () => {
		expect(getAssetDimensionsFromRefString(TEST_IMAGE_REF_ID)).toEqual({
			width: 2400,
			height: 1600
		});
	});

	it('Throws an error if the asset _ref is invalid', () => {
		expect(() => getAssetDimensionsFromRefString('')).toThrowError(
			'Invalid asset _ref provided: ""'
		);
	});

	it('Throws an error if dimensions string is invalid', () => {
		expect(() =>
			getAssetDimensionsFromRefString(
				'image-d8d83c64bb2144283a2644afd2390f2b5e439041-8025xinvalid-jpg'
			)
		).toThrowError(
			'Invalid dimensions in _ref string: "image-d8d83c64bb2144283a2644afd2390f2b5e439041-8025xinvalid-jpg"'
		);
	});
});
