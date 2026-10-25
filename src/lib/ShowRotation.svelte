<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Production, ProductionEvent } from './Production';
	import { getNextShows } from './showRotation';

	const MAX_PROGRESS_TIME = 15; // in seconds

	const {
		showData,
		date,
		children
	}: {
		showData: Production;
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
	<p class="ta-center">
		{#if showData.companies.length > 1}
			{show.companies.join(', ')}
			<br />
		{/if}
		<span class="c-prim-fg-1 fw-strong">
			{new Date(show.startDate).toLocaleString('de-DE', {
				dateStyle: 'full',
				timeStyle: 'short'
			})} Uhr
		</span>

		{#if show.isPublic === false || show.name}
			<br />
			<span class="c-fg-3">
				{#if show.isPublic === false}
					Nicht öffentliche Veranstaltung{#if show.name}: {show.name}{/if}
				{:else}
					{show.name}
				{/if}
			</span>
		{/if}
	</p>

	{@render children(show)}
{/if}
