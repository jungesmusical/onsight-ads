<script lang="ts">
	import { tick } from 'svelte';
	import type { Production, Role } from './Production';
	import Picture from './Picture.svelte';

	// Damit wenige Personen nicht bildschirmfüllend groß werden
	const MIN_COLUMNS = 3;

	const {
		roles,
		people,
		markWalkIn = false
	}: {
		roles: (Role & { walkInCover?: boolean })[];
		people: Production['people'];
		/** Hängt ein `*` an die Namen von Rollen, die ein Walk-in-Cover spielt. */
		markWalkIn?: boolean;
	} = $props();

	const tiles = $derived(
		roles.flatMap((role) =>
			role.members.map((uuid) => ({
				key: role.roleName + uuid,
				roleName: role.roleName,
				person: people[uuid],
				name: markWalkIn && role.walkInCover ? people[uuid].name + '*' : people[uuid].name
			}))
		)
	);

	const SEARCH_STEPS = 10;
	// Hochformatige Anordnung darf bis zu 8 % kleinere Fotos haben, damit der Bildschirm gefüllt wird
	const TALL_PREFERENCE = 0.92;

	let grid: HTMLElement;
	let rowCount = $state(1);
	let fitRun = 0;

	const rows = $derived(splitIntoRows(tiles, rowCount));

	function initials(name: string): string {
		return name
			.split(' ')
			.map((part) => part[0])
			.join('')
			.slice(0, 2);
	}

	// Verteilt gleichmäßig (z. B. 13 → 4, 5, 4 statt 5, 5, 3), damit keine Reihe verwaist
	function splitIntoRows<T>(items: T[], count: number): T[][] {
		return Array.from({ length: count }, (_, row) =>
			items.slice(
				Math.round((row * items.length) / count),
				Math.round(((row + 1) * items.length) / count)
			)
		);
	}

	function setTileWidth(width: number) {
		grid.style.setProperty('--tile-width', `${width}px`);
	}

	function fitsOnScreen(): boolean {
		return document.documentElement.scrollHeight <= window.innerHeight;
	}

	// Binärsuche statt Formel, weil Beschriftungen je nach Breite anders umbrechen
	function largestFittingWidth(maxWidth: number): number {
		setTileWidth(maxWidth);
		if (fitsOnScreen()) return maxWidth;

		let low = 0;
		let high = maxWidth;
		for (let step = 0; step < SEARCH_STEPS; step++) {
			const width = (low + high) / 2;
			setTileWidth(width);
			if (fitsOnScreen()) low = width;
			else high = width;
		}
		return low;
	}

	// Probiert jede Reihenanzahl; mehr Reihen gewinnen, solange die Fotos kaum kleiner werden
	async function fit() {
		if (tiles.length === 0) return;

		const run = ++fitRun;
		const gap = parseFloat(getComputedStyle(grid).rowGap);
		const maxRows = Math.ceil(tiles.length / Math.min(MIN_COLUMNS, tiles.length));
		const variants: { rowCount: number; width: number; maxWidth: number }[] = [];
		for (let count = 1; count <= maxRows; count++) {
			rowCount = count;
			await tick();
			if (run !== fitRun) return;

			const columns = Math.ceil(tiles.length / count);
			const maxWidth = (grid.clientWidth - (columns - 1) * gap) / columns;
			variants.push({ rowCount: count, width: largestFittingWidth(maxWidth), maxWidth });
		}

		const widest = Math.max(...variants.map((variant) => variant.width));
		let best = variants.findLast((variant) => variant.width >= widest * TALL_PREFERENCE)!;
		// Passt gar nichts (z. B. Querformat), lieber eine Reihe als unsichtbar kleine Fotos
		if (widest === 0) best = { ...variants[0], width: variants[0].maxWidth };

		rowCount = best.rowCount;
		await tick();
		setTileWidth(best.width);
	}

	$effect(() => {
		void tiles;
		fit();
		document.fonts.ready.then(fit);
	});
</script>

<svelte:window onresize={fit} />

<div class="photo-grid" bind:this={grid}>
	{#each rows as row, index (index)}
		<ul>
			{#each row as tile (tile.key)}
				<li>
					<figure>
						{#if tile.person.image}
							<Picture image={tile.person.image} />
						{:else}
							<div class="placeholder" aria-hidden="true">{initials(tile.person.name)}</div>
						{/if}
						<figcaption>
							<span class="name fw-strong">{tile.name}</span>
							{#if tile.roleName}
								<span class="role c-fg-3">{tile.roleName}</span>
							{/if}
						</figcaption>
					</figure>
				</li>
			{/each}
		</ul>
	{/each}
</div>

<style>
	.photo-grid {
		--gap: var(--xs);

		display: flex;
		flex-direction: column;
		gap: var(--gap);
		/* Bricht aus der Inhaltsbreite aus, damit die Fotos größer werden können */
		margin: var(--xs) calc(50% - 50vw + var(--m));
	}

	ul {
		display: flex;
		justify-content: center;
		gap: var(--gap);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		flex: 0 0 var(--tile-width, 10rem);
		min-width: 0;
		margin: 0;
		padding: 0;
	}

	figure {
		margin: 0;
	}

	figure :global(img),
	.placeholder {
		display: block;
		aspect-ratio: 4 / 5;
		width: 100%;
		object-fit: cover;
		border-radius: 0.25rem;
		background-color: var(--c-bg-2);
	}

	.placeholder {
		display: grid;
		place-items: center;
		font-family: var(--ff-serif);
		font-size: var(--fs-xl);
		color: var(--c-fg-3);
	}

	figcaption {
		display: flex;
		flex-direction: column;
		padding-top: var(--xxs);
		font-size: var(--fs-xs);
		text-align: center;
		text-wrap: balance;
	}

	.name {
		hyphens: none;
		overflow-wrap: break-word;
	}

	.role {
		font-size: var(--fs-xxs);
	}
</style>
