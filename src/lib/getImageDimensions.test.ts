/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import {
	getAssetDimensionsFromRefString,
	getImageDimensions,
	getReferenceId
} from './getImageDimensions.js';
import { BASE_URL, DEFAULT_IMAGE, TEST_IMAGE_REF_ID } from '../constants.js';

describe('getReferenceId', () => {
	it('Returns the correct reference ID for a string image', () => {
		const image = BASE_URL;
		expect(getReferenceId(image)).toEqual(image);
	});

	it('Returns the correct _id for an image with asset property', () => {
		const image = {
			asset: {
				_id: TEST_IMAGE_REF_ID
			}
		};
		expect(getReferenceId(image)).toEqual(image.asset._id);
	});

	it('Returns the correct _ref for an image with asset property', () => {
		const image = {
			asset: {
				_ref: TEST_IMAGE_REF_ID
			}
		};
		expect(getReferenceId(image)).toEqual(image.asset._ref);
	});

	it('Returns the correct reference ID for an image with _ref property', () => {
		const image = {
			_ref: TEST_IMAGE_REF_ID
		};
		expect(getReferenceId(image)).toEqual(image._ref);
	});

	it('Returns the correct reference ID for an image with _id property', () => {
		const image = {
			_id: 'image-id'
		};
		expect(getReferenceId(image)).toEqual(image._id);
	});

	it('Throws an error if the image input is empty', () => {
		// @ts-expect-error testing
		expect(() => getReferenceId(undefined)).toThrowError(
			'Invalid input: image is empty. Cannot get _ref or _id.'
		);
	});

	it('Throws an error if the image input is malformed', () => {
		const invalidImage = {
			foo: 'bar'
		};

		expect(() => getReferenceId(invalidImage)).toThrowError(
			'Invalid input: image is malformed. Cannot get _ref or _id.'
		);
	});
});

describe('getDimsFromId', () => {
	it('Extracts the correct dimensions from the asset _ref', () => {
		expect(getAssetDimensionsFromRefString(TEST_IMAGE_REF_ID)).toEqual({
			width: 2400,
			height: 1600
		});
	});

	it('Throws an error if the asset _ref is invalid', () => {
		expect(() => getAssetDimensionsFromRefString('foo')).toThrowError(
			'Invalid input: asset "foo" is invalid'
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

describe('getImageDimensions', () => {
	it('Gets the correct image dimensions', () => {
		expect(getImageDimensions(DEFAULT_IMAGE)).toEqual({
			height: 1600,
			width: 2400
		});
	});

	it('Throws an error if the image input is invalid', () => {
		expect(() => getImageDimensions(undefined as any)).toThrowError(
			'Invalid input: image is empty. Cannot get _ref or _id.'
		);
	});

	it('Throws an error if the image input is invalid', () => {
		expect(() => getImageDimensions({} as any)).toThrowError(
			'Invalid input: image is malformed. Cannot get _ref or _id.'
		);
	});

	it('Throws an error if the image input is invalid', () => {
		expect(() => getImageDimensions({ foo: 'bar' } as any)).toThrowError(
			'Invalid input: image is malformed. Cannot get _ref or _id.'
		);
	});
});
