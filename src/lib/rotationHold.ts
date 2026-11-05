import { writable } from 'svelte/store';

/** Solange `true`, wartet der Kiosk-Modus mit dem Wechsel zur nächsten Seite. */
export const rotationHold = writable(false);
