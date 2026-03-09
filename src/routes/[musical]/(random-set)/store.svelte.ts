import { writable, get } from 'svelte/store';

export const numItem = writable(0);
const shuffledIndices = writable<number[]>([]);
const currentPosition = writable(0);

const STORAGE_PREFIX = 'onsight-ads-shuffle';

/**
 * Get storage key for a specific route and musical
 */
function getStorageKey(musical: string, routeKey: string): string {
	return `${STORAGE_PREFIX}-${musical}-${routeKey}`;
}

/**
 * Load shuffle state from localStorage
 */
function loadFromStorage(
	musical: string,
	routeKey: string,
	arrayLength: number
): { indices: number[]; position: number } | null {
	if (typeof window === 'undefined') return null;

	try {
		const stored = localStorage.getItem(getStorageKey(musical, routeKey));
		if (!stored) return null;

		const data = JSON.parse(stored);

		// Validate that stored data matches current array length
		if (!Array.isArray(data.indices) || data.indices.length !== arrayLength) {
			return null;
		}

		return {
			indices: data.indices,
			position: typeof data.position === 'number' ? data.position : 0
		};
	} catch (e) {
		console.warn('Failed to load shuffle state from localStorage:', e);
		return null;
	}
}

/**
 * Save shuffle state to localStorage
 */
function saveToStorage(musical: string, routeKey: string, indices: number[], position: number): void {
	if (typeof window === 'undefined') return;

	try {
		localStorage.setItem(getStorageKey(musical, routeKey), JSON.stringify({ indices, position }));
	} catch (e) {
		console.warn('Failed to save shuffle state to localStorage:', e);
	}
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
function shuffle<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

/**
 * Initialize or reset the shuffled sequence
 */
function initializeShuffledSequence(musical: string, routeKey: string, arrayLength: number): void {
	const indices = Array.from({ length: arrayLength }, (_, i) => i);
	const shuffledArray = shuffle(indices);
	shuffledIndices.set(shuffledArray);
	currentPosition.set(0);
	saveToStorage(musical, routeKey, shuffledArray, 0);
}

/**
 * Get the next item in the shuffled sequence
 * When reaching the end, reshuffle and start over
 * @param musical - The musical identifier (e.g., 'jm2024')
 * @param routeKey - Unique key to identify the route (e.g., 'gallery', 'external-ads')
 * @param arrayLength - The length of the array
 */
export function getNextItem(musical: string, routeKey: string, arrayLength: number): number {
	// Try to load from storage first
	const stored = loadFromStorage(musical, routeKey, arrayLength);

	let indices = get(shuffledIndices);
	let position = get(currentPosition);

	// Use stored data if available and valid
	if (stored) {
		indices = stored.indices;
		position = stored.position;
		shuffledIndices.set(indices);
		currentPosition.set(position);
	}
	// Initialize if not yet set up or if array length changed
	else if (indices.length !== arrayLength) {
		initializeShuffledSequence(musical, routeKey, arrayLength);
		indices = get(shuffledIndices);
		position = 0;
	}

	// Get current item
	const itemIndex = indices[position];

	// Move to next position, reshuffle if at the end
	position++;
	if (position >= indices.length) {
		initializeShuffledSequence(musical, routeKey, arrayLength);
		position = 0;
	} else {
		currentPosition.set(position);
		saveToStorage(musical, routeKey, indices, position);
	}

	return itemIndex;
}

/**
 * Parse and validate the item parameter from URL
 * If no item specified, get the next item from the shuffled sequence
 * @param url - The URL object containing search params
 * @param musical - The musical identifier (e.g., 'jm2024')
 * @param routeKey - Unique key to identify the route (e.g., 'gallery', 'external-ads')
 * @param arrayLength - The length of the array to validate against
 * @returns The validated item index
 */
export function parseItemParam(url: URL, musical: string, routeKey: string, arrayLength: number): number {
	const numItemParam = url.searchParams.get('item');
	let numItem = parseInt(numItemParam ?? '-1') ?? -1;

	// If no item specified, get next from shuffled sequence
	if (numItem === -1) {
		numItem = getNextItem(musical, routeKey, arrayLength);
	}

	// Validate bounds
	if (numItem < 0 || numItem >= arrayLength) {
		numItem = 0;
	}

	return numItem;
}

export default {
	numItem
};
