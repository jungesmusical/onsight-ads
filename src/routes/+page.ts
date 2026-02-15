import type { PageLoad } from './$types';
import type { ProductionsData } from '$lib';
import { PUBLIC_HOMEPAGE_HOST } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch }) => {
	const url = PUBLIC_HOMEPAGE_HOST + '/musical.json';

	try {
		const res = await fetch(url);

		if (!res.ok) {
			error(res.status, 'Failed to fetch data from server');
		}

		const productionsData: ProductionsData = await res.json();

		return {
			productionsData
		};
	} catch (e) {
		// If we already threw an error() above, it will be caught here and re-thrown
		if (e && typeof e === 'object' && 'status' in e) {
			throw e;
		}
		// For other errors (network, parsing, etc.), return 500
		error(500, 'Failed to fetch data from server');
	}
};
