/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import { getReferenceId } from '../getImageDimensions.js';
import { BASE_URL, DEFAULT_REF_ID } from './constants.js';

describe('getReferenceId', () => {
	it('Returns the correct reference ID for a string image', () => {
		const image = BASE_URL;
		expect(getReferenceId(image)).toEqual(image);
	});

	it('Returns the correct _id for an image with asset property', () => {
		const image = {
			asset: {
				_id: DEFAULT_REF_ID
			}
		};
		expect(getReferenceId(image)).toEqual(image.asset._id);
	});

	it('Returns the correct _ref for an image with asset property', () => {
		const image = {
			asset: {
				_ref: DEFAULT_REF_ID
			}
		};
		expect(getReferenceId(image)).toEqual(image.asset._ref);
	});

	it('Returns the correct reference ID for an image with _ref property', () => {
		const image = {
			_ref: DEFAULT_REF_ID
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
		expect(() => getReferenceId(undefined as any)).toThrowError(
			'"image" is empty. Cannot get _ref or _id.'
		);
	});

	it('Throws an error if the image input is malformed', () => {
		const image = {
			foo: 'bar'
		};
		expect(() => getReferenceId(image as any)).toThrowError(
			'"image" is malformed. Cannot get _ref or _id.'
		);
	});
});
