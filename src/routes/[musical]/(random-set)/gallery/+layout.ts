import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import galleryStore from './store.svelte';

export const load = (async ({ url, parent }) => {
	const { showData } = await parent();

	// NumItem
	const numItemParam = url.searchParams.get('item');
	let numItem = parseInt(numItemParam ?? '-1') ?? -1;

	if (showData.common.gallery === undefined || showData.common.gallery.length === 0) {
		error(404, 'No gallery items found for ' + showData.common.title);
	}

	if (numItem === -1) {
		numItem = Math.floor(Math.random() * showData.common.gallery.length);
	}

	if (numItem < 0 || numItem >= showData.common.gallery.length) {
		numItem = 0;
	}

	galleryStore.numItem.set(numItem);

	// Debug
	const debugParam = url.searchParams.get('debug');
	const debug = debugParam === 'true' || debugParam === '1' || debugParam !== null;

	return {
		debug
	};
}) satisfies LayoutLoad;
