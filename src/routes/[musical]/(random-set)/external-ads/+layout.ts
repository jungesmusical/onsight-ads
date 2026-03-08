import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ url, parent }) => {
	const { showData } = await parent();
	const numItemParam = url.searchParams.get('item');
	let numItem = parseInt(numItemParam ?? '-1') ?? -1;

	if (showData.common.externalAds === undefined || showData.common.externalAds.length === 0) {
		error(404, 'No external ads found for ' + showData.common.title);
	}

	if (numItem === -1) {
		numItem = Math.floor(Math.random() * showData.common.externalAds.length);
	}

	if (numItem < 0 || numItem >= showData.common.externalAds.length) {
		numItem = 0;
	}

	return { numItem };
}) satisfies LayoutLoad;
