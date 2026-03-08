import { writable } from 'svelte/store';

export const numItem = writable(0);

export default {
	numItem
};
