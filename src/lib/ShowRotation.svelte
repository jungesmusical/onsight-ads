<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Production, ProductionEvent } from './Production';
	import { getNextShows } from './showRotation';

	const MAX_PROGRESS_TIME = 15; // in seconds

	const {
		showData,
		title,
		showCompanies = true,
		date,
		children
	}: {
		showData: Production;
		/** Überschrift der Seite; als Funktion, wenn sie von der jeweiligen Show abhängt. */
		title: string | ((show: ProductionEvent) => string);
		/** Blendet die Besetzung (z. B. „Premieren-Besetzung“) aus, wenn sie für die Seite egal ist. */
		showCompanies?: boolean;
		/** Fixer Zeitpunkt statt der aktuellen Uhrzeit, z. B. zum Testen. */
		date?: string | null;
		children: Snippet<[ProductionEvent]>;
	} = $props();

	const getNow = () => (date ? new Date(date) : new Date());

	let now = $state(getNow());
	let showIterator = $state(0);
	let progress = $state(0);

	const nextShows = $derived(getNextShows(showData, now));
	const show = $derived(nextShows[showIterator]);

	function subtitleLines(show: ProductionEvent): string[] {
		return [
			showCompanies && showData.companies.length > 1 ? show.companies.join(', ') : null,
			show.isPublic ? null : 'Nicht öffentliche Veranstaltung'
		].filter((line) => line !== null);
	}

	$effect(() => {
		const interval = setInterval(() => {
			now = getNow();

			progress += 0.01;
			if (progress > MAX_PROGRESS_TIME) {
				progress = 0;
				showIterator = (showIterator + 1) % nextShows.length;
			}
		}, 10); // 100 times per second

		return () => clearInterval(interval);
	});
</script>

{#if nextShows.length > 1}
	<div style="display:flex; justify-content: stretch; margin: 1rem 0; gap: 1rem;">
		{#each nextShows.keys() as i}
			<progress
				max={MAX_PROGRESS_TIME}
				value={showIterator === i ? progress : showIterator > i ? MAX_PROGRESS_TIME : 0}
			></progress>
		{/each}
	</div>
{/if}

{#if show === undefined}
	<p class="ta-center">Aktuell keine aktive Veranstaltung...</p>
	<p class="ta-center fs-xxs c-fg-3">
		{new Intl.DateTimeFormat('de-DE', {
			dateStyle: 'full',
			timeStyle: 'long'
		}).format(now)}
	</p>
{:else}
	{@const subtitle = subtitleLines(show)}
	<header class="ta-center">
		<h2>{typeof title === 'string' ? title : title(show)}</h2>
		<p class="date c-prim-fg-1 fw-strong">
			{new Date(show.startDate).toLocaleString('de-DE', {
				dateStyle: 'full',
				timeStyle: 'short'
			})} Uhr{#if show.name}{' '}({show.name}){/if}
		</p>
		{#each subtitle as line}
			<p class="c-fg-3">{line}</p>
		{/each}
	</header>

	{@render children(show)}
{/if}

<style>
	header {
		margin-block: var(--l) var(--m);

		& > * {
			margin: 0;
		}
	}

	.date {
		font-size: var(--fs-xs);
		letter-spacing: var(--lsp-wide);
	}

	h2 {
		margin-bottom: var(--xxs);
	}
</style>
