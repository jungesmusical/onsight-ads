import type { LayoutLoad } from './$types';
import type { ShowData } from '$lib/ShowData';
import { PUBLIC_HOMEPAGE_HOST, PUBLIC_MUSICAL } from '$env/static/public';



export const load: LayoutLoad = async ({ fetch }) => {
	const url = PUBLIC_HOMEPAGE_HOST + '/musical/' + PUBLIC_MUSICAL + '.json';

	const res = await fetch(url);
	const showData: ShowData = await res.json();

	return {
		showData
	};
};
