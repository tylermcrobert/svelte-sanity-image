import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { getImageProps } from '../getImageProps.js';
import { DEFAULT_IMAGE } from '../../constants.js';
import { client } from '../../sanity.js';

describe('getImageProps', () => {
	let consoleSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		consoleSpy.mockRestore();
	});

	it('logs an error when image and client are not provided', () => {
		// @ts-expect-error testing invalid input
		const result = getImageProps(null, null);

		expect(consoleSpy).toHaveBeenCalledWith(new Error('Sanity image and client are required.'));
		expect(result).toEqual({
			src: undefined,
			srcset: undefined,
			width: undefined,
			height: undefined
		});
	});

	it('logs an error when image is provided but client is not', () => {
		// @ts-expect-error testing invalid input
		const result = getImageProps(DEFAULT_IMAGE, null);

		expect(consoleSpy).toHaveBeenCalledWith(new Error('Sanity image and client are required.'));
		expect(result).toEqual({
			src: undefined,
			srcset: undefined,
			width: undefined,
			height: undefined
		});
	});

	it('logs an error when image is incorrectly provided', () => {
		const result = getImageProps('FOO', client);

		expect(consoleSpy).toHaveBeenCalledWith(new Error('Invalid input: asset "FOO" is invalid'));
		expect(result).toEqual({
			src: undefined,
			srcset: undefined,
			width: undefined,
			height: undefined
		});
	});
});
