import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => {
	const date = url.searchParams.get('date');

	return { date };
};
