import type { PageLoad } from './$types';
import type { ProductionsData } from '$lib';
import { PUBLIC_HOMEPAGE_HOST } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch }) => {
	const url = PUBLIC_HOMEPAGE_HOST + '/musical.json';

	try {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error();
		}

		const productionsData: ProductionsData = await res.json();

		return {
			productionsData
		};
	} catch (e){
    console.error('Error fetching data:', e);

		error(500, 'Failed to fetch data from server');
	}
};
