import type { PageLoad } from './$types';
import type { ShowData } from '$lib/ShowData';
import { PUBLIC_HOMEPAGE_HOST } from '$env/static/public';

export const load: PageLoad = async ({ fetch, params }) => {
	const url = PUBLIC_HOMEPAGE_HOST + '/musical/' + params.musical + '.json';

	const res = await fetch(url);
	const showData: ShowData = await res.json();

	return {
		showData,
	};
};
