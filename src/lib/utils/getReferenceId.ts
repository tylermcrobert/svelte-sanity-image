import type {
	SanityImageSource,
	SanityImageObject,
	SanityReference,
	SanityAsset
} from '@sanity/image-url/lib/types/types.d.ts';

// TODO:
// Add tests

// REFERENCE
// https://github.com/lorenzodejong/next-sanity-image/blob/3b11583385d69a3e195aa142c974d2e014d492c6/src/useNextSanityImage.ts#L33

// TODO: catch this:

// interface SanityImageWithAssetStub {
// 	asset: {
// 		url: string;
// 	};
// }

export function getReferenceId(image: SanityImageSource): string | undefined {
	if (typeof image === 'string') {
		return image;
	}

	const obj = image as SanityImageObject;
	const ref = image as SanityReference;
	const img = image as SanityAsset;

	if (obj.asset) {
		return obj.asset._ref || (obj.asset as SanityAsset)._id;
	}

	return ref._ref || img._id || undefined;
}
