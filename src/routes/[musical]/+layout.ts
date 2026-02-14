import type { LayoutLoad } from './$types';
import type { ShowData } from '$lib/ShowData';
import { PUBLIC_HOMEPAGE_HOST } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const url = PUBLIC_HOMEPAGE_HOST + '/musical/' + params.musical + '.json';

	try {
		const res = await fetch(url);

		if (!res.ok) {
			error(res.status, 'Failed to fetch show data');
		}

		const showData: ShowData = await res.json();

		return {
			showData
		};
	} catch {
		error(404, 'Nothing found for ' + params.musical);
	}
};
