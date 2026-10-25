import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import sharedStore, { parseItemParam } from '../store.svelte';

export const load = (async ({ url, params, parent }) => {
	const { showData } = await parent();

	if (showData.externalAds.length === 0) {
		error(404, 'No external ads found for ' + showData.name);
	}

	const numItem = parseItemParam(url, params.musical, 'external-ads', showData.externalAds.length);
	sharedStore.numItem.set(numItem);

	return {};
}) satisfies LayoutLoad;
