import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import sharedStore, { parseItemParam } from '../store.svelte';

export const load = (async ({ url, params, parent }) => {
	const { showData } = await parent();

	if (showData.common.gallery === undefined || showData.common.gallery.length === 0) {
		error(404, 'No gallery items found for ' + showData.common.title);
	}

	const numItem = parseItemParam(url, params.musical, 'gallery', showData.common.gallery.length);
	sharedStore.numItem.set(numItem);

	// Debug
	const debugParam = url.searchParams.get('debug');
	const debug = debugParam === 'true' || debugParam === '1' || debugParam !== null;

	return {
		debug
	};
}) satisfies LayoutLoad;
