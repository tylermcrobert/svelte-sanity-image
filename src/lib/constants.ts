/**
 * An array of default sizes for the srcset
 * attribute of an image.
 *
 * A direct reference to the defaults used
 * in the Next Image component:
 *
 * https://nextjs.org/docs/pages/api-reference/components/image#imagesizes
 */
export const DEFAULT_IMAGE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

export const VALID_BUILDER_OPTIONS = new Set([
	// 'blur',
	// 'bg',
	// 'dpr',
	'width',
	'height',
	'quality'
	// 'focalPoint',
	// 'maxWidth',
	// 'maxHeight',
	// 'minWidth',
	// 'minHeight',
	// 'sharpen',
	// 'rect',
	// 'format',
	// 'invert',
	// 'orientation',
	// 'quality',
	// 'download',
	// 'flipHorizontal',
	// 'flipVertical',
	// 'ignoreImageParams',
	// 'fit',
	// 'crop',
	// 'saturation',
	// 'auto',
	// 'pad',
	// 'vanityName',
	// 'frame'
] as const);
