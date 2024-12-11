import { describe, expect, it, vi } from 'vitest';
import { getImageProps } from './getImageProps.js';
import { DEFAULT_IMAGE } from '../constants.js';
import { client } from '../sanity.js';

describe('getImageProps', () => {
	it('logs an error when image and client are not provided', () => {
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		// @ts-expect-error testing
		const result = getImageProps(null, null);

		expect(consoleSpy).toHaveBeenCalledWith(new Error('Sanity image and client are required.'));

		expect(result).toEqual({
			src: undefined,
			srcset: undefined,
			width: undefined,
			height: undefined
		});

		consoleSpy.mockRestore();
	});

	it('logs an error when image is provided but client is not', () => {
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		// @ts-expect-error testing
		const result = getImageProps(DEFAULT_IMAGE, null);

		expect(consoleSpy).toHaveBeenCalledWith(new Error('Sanity image and client are required.'));

		expect(result).toEqual({
			src: undefined,
			srcset: undefined,
			width: undefined,
			height: undefined
		});

		consoleSpy.mockRestore();
	});

	it('Logs an error when image is incorrectly provided', () => {
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		const result = getImageProps('FOO', client);

		expect(consoleSpy).toHaveBeenCalledWith(new Error('Invalid input: asset "FOO" is invalid'));

		expect(result).toEqual({
			src: undefined,
			srcset: undefined,
			width: undefined,
			height: undefined
		});

		consoleSpy.mockRestore();
	});
});
