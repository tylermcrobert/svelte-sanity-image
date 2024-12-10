/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import { getImageDimensions } from './getImageDimensions.js';
import { DEFAULT_IMAGE } from '../constants.js';

describe('getImageDimensions', () => {
	it('Gets the correct image dimensions', () => {
		expect(getImageDimensions(DEFAULT_IMAGE)).toEqual({
			height: 1600,
			width: 2400
		});
	});

	it('Throws an error if the image input is invalid', () => {
		expect(() => getImageDimensions({} as any)).toThrowError(
			'input "image" is malformed. Cannot get _ref or _id.'
		);
	});

	it('Throws an error if the image input is invalid', () => {
		expect(() => getImageDimensions({ foo: 'bar' } as any)).toThrowError(
			'input "image" is malformed. Cannot get _ref or _id.'
		);
	});

	it('Throws an error if the image input is invalid', () => {
		expect(() => getImageDimensions(undefined as any)).toThrowError(
			'"image" is empty. Cannot get _ref or _id.'
		);
	});
});
