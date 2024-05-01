/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import getImageDimensions from '../utils/getImageDimensions';
import { DEFAULT_IMAGE } from '$lib/tests/constants';

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
