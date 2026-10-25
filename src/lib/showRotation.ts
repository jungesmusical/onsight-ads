import type { Production, ProductionEvent } from './Production';

const HOUR_MS = 60 * 60 * 1000;
const LEAD_TIME_MS = 1.5 * HOUR_MS;
const TRAIL_TIME_MS = 0.5 * HOUR_MS;
const FALLBACK_SHOW_LENGTH_MS = 3 * HOUR_MS;

function isoDurationToMs(duration: string | null): number {
	const match = duration?.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
	if (!match) return 0;
	const [, hours = 0, minutes = 0, seconds = 0] = match;
	return (Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)) * 1000;
}

function showLengthMs({ duration, intermission }: Production): number {
	const playTime = isoDurationToMs(duration);
	return playTime > 0 ? playTime + isoDurationToMs(intermission) : FALLBACK_SHOW_LENGTH_MS;
}

/** Laufende Termine; gibt es keine, der nächste anstehende. */
export function getNextShows(production: Production, now: Date): ProductionEvent[] {
	const length = showLengthMs(production) + TRAIL_TIME_MS;
	const time = now.getTime();

	const running = production.events.filter((event) => {
		const start = Date.parse(event.startDate);
		return start - LEAD_TIME_MS < time && time < start + length;
	});
	if (running.length > 0) return running;

	const upcoming = production.events.find(
		(event) => Date.parse(event.startDate) - LEAD_TIME_MS > time
	);
	return upcoming ? [upcoming] : [];
}
