import type { LayoutLoad } from './$types';
import type { ShowData } from '$lib/ShowData';
import { PUBLIC_HOMEPAGE_HOST } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const url = PUBLIC_HOMEPAGE_HOST + '/musical/' + params.musical + '.json';

	try {
		const res = await fetch(url);

		if (!res.ok) {
			error(res.status, res.status === 404 ? 'Nothing found for ' + params.musical : 'Failed to fetch show data');
		}

		const showData: ShowData = await res.json();

		return {
			showData
		};
	} catch (e) {
		// If we already threw an error() above, it will be caught here and re-thrown
		if (e && typeof e === 'object' && 'status' in e) {
			throw e;
		}
		// For other errors (network, parsing, etc.), return 500
		error(500, 'Failed to load musical data for ' + params.musical);
	}
};
