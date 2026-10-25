const listFormat = new Intl.ListFormat('de-DE', { style: 'long', type: 'conjunction' });

/** Mit `withAnd: false` nur Kommas, da `Intl.ListFormat` im Deutschen immer „und“ setzt. */
export function joinNames(names: string[], { withAnd = true } = {}): string {
	const joinable = names.map((name) => name.replaceAll(' ', '\u00A0'));
	return withAnd ? listFormat.format(joinable) : joinable.join(', ');
}
