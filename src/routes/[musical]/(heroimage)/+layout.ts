import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => {
	const date = url.searchParams.get('date');
	const disableHeaderVideoParam = url.searchParams.get('disableHeaderVideo');
	const disableHeaderVideo =
		disableHeaderVideoParam === '' ||
		disableHeaderVideoParam === '1' ||
		disableHeaderVideoParam?.toLowerCase() === 'true';

	return {
		date,
		disableHeaderVideo
	};
};
