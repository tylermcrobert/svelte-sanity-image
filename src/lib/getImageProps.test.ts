import { describe, expect, it, vi } from 'vitest';
import { getImageProps } from './getImageProps.js';

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
});
