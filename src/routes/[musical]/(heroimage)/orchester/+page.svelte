<script lang="ts">
	import type { PageData } from './$types';
	import type { Production, ProductionEvent } from '$lib';
	import { personNames } from '$lib/personNames';

	const listFormat = new Intl.ListFormat('de-DE', { style: 'long', type: 'conjunction' });

	function getNextShows(shows: Production['events'], currentDate = new Date()): ProductionEvent[] {
		const nextShows: ProductionEvent[] = [];

		shows.forEach((show) => {
			const start = new Date(show.startDate);
			start.setTime(start.getTime() - 1000 * 60 * 60 * 1.5); // 1.5 hours before show start

			const end = new Date(show.startDate);
			end.setTime(end.getTime() + 1000 * 60 * 60 * 3); // 4 hours after show start

			if (start < currentDate && currentDate < end) {
				nextShows.push(show);
			}
		});

		if (nextShows.length === 0) {
			shows.forEach((show) => {
				// todo: iterate over all shows and find the nearest to current time
				const start = new Date(show.startDate);
				start.setTime(start.getTime() - 1000 * 60 * 60 * 1.5); // 1.5 hours before show start

				if (start > currentDate && nextShows.length === 0) {
					nextShows.push(show);
				}
			});
		}

		return nextShows;
	}

	function getNextShowIterator(
		shows: ProductionEvent[],
		iterator: number
	): ProductionEvent | undefined {
		if (iterator < 0 || iterator >= shows.length) {
			return undefined;
		}

		return shows[iterator];
	}

	const { data } = $props<{ data: PageData }>();
	const showData = $derived(data.showData);

	let currentTime = $state(() => (data.date ? new Date(data.date) : new Date(Date.now())));

	let nextShowsLive = $derived(getNextShows(showData.events, currentTime()));
	let numberOfNextShows = $derived(nextShowsLive.length);

	let showIterator = $state(0);
	let show = $derived(getNextShowIterator(nextShowsLive, showIterator));

	const MAX_PROGRESS_TIME = 15; // in seconds
	let progress = $state(0);

	setInterval(() => {
		currentTime = () => (data.date ? new Date(data.date) : new Date(Date.now()));

		progress += 0.01;
		if (progress > MAX_PROGRESS_TIME) {
			progress = 0;
			showIterator = (showIterator + 1) % numberOfNextShows;
		}
	}, 10); // 100 times per second
</script>

{#if numberOfNextShows > 1}
	<div style="display:flex; justify-content: stretch; margin: 1rem 0; gap: 1rem;">
		{#each Array.from(Array(numberOfNextShows).keys()) as i}
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
		}).format(currentTime())}
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

	<h2>Orchester</h2>

	{#if show.conductors.length > 0}
		<p class="ta-center">
			Die heutige Show wird dirigiert von {listFormat
				.format(personNames(show.conductors, showData.people))
				.replaceAll(' ', ' ')}.
		</p>
	{/if}

	<ul class="dot-list">
		{#each show.orchestra as role}
			<li class="dot-list__item">
				<span class="dot-list__label fw-strong"><span>{role.roleName}</span></span>
				<span class="dot-list__label no-hyphens"
					><span
						>{personNames(role.members, showData.people)
							.map((str) => str.replaceAll(' ', ' '))
							.join(', ')}</span
					></span
				>
			</li>
		{/each}
	</ul>
{/if}
