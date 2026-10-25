import type { Production } from './Production';

export function personNames(uuids: string[], people: Production['people']): string[] {
	return uuids.map((uuid) => people[uuid].name);
}
