import type { LayoutLoad } from './$types';

const DEFAULT_INTERVAL_SECONDS = 10;
const MIN_INTERVAL_SECONDS = 1;
const MAX_INTERVAL_SECONDS = 3600;

function parseBoolParam(value: string | null): boolean {
	if (value === null) {
		return false;
	}

	if (value === '' || value === '1' || value.toLowerCase() === 'true') {
		return true;
	}

	return false;
}

function parseIntervalSeconds(value: string | null): number {
	if (value === null) {
		return DEFAULT_INTERVAL_SECONDS;
	}

	const parsed = Number.parseInt(value, 10);

	if (Number.isNaN(parsed)) {
		return DEFAULT_INTERVAL_SECONDS;
	}

	return Math.min(MAX_INTERVAL_SECONDS, Math.max(MIN_INTERVAL_SECONDS, parsed));
}

function parsePlaylist(value: string | null): string[] {
	if (value === null) {
		return [];
	}

	return value
		.split(',')
		.map((entry) => entry.trim())
		.filter((entry) => entry.length > 0);
}

export const load: LayoutLoad = ({ url }) => {
	const kiosk = parseBoolParam(url.searchParams.get('kiosk'));
	const intervalSeconds = parseIntervalSeconds(url.searchParams.get('interval'));
	const playlist = parsePlaylist(url.searchParams.get('playlist'));

	return {
		kiosk,
		intervalSeconds,
		playlist
	};
};
