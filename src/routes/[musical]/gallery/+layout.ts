import type { LayoutLoad } from './$types';

export const load = (async ({ url, parent }) => {
	const { showData } = await parent();
	const numItemParam = url.searchParams.get('item');
	let numItem = parseInt(numItemParam ?? '-1') ?? -1;

	if (showData.common.gallery.length === 0) {
		throw new Error('No gallery items found');
	}

	if (numItem === -1) {
		numItem = Math.floor(Math.random() * showData.common.gallery.length);
	}

	if (numItem < 0 || numItem >= showData.common.gallery.length) {
		numItem = 0;
	}

	return { numItem };
}) satisfies LayoutLoad;
