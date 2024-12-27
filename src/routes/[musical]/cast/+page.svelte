<script lang="ts">
	import type { PageData } from './$types';
	import type { ShowData, SingleShow } from '$lib/ShowData';
	import { page } from '$app/stores';

	function getNextShows(shows: ShowData['shows'], currentDate = new Date()): SingleShow[] {
		const nextShows: SingleShow[] = [];

		shows.forEach((show) => {
			const start = new Date(show.timestamp);
			start.setTime(start.getTime() - 1000 * 60 * 60 * 1.5); // 1.5 hours before show start

			const end = new Date(show.timestamp);
			end.setTime(end.getTime() + 1000 * 60 * 60 * 3); // 4 hours after show start

			if (start < currentDate && currentDate < end) {
				nextShows.push(show);
			}
		});

		return nextShows;
	}

	let { data }: { data: PageData } = $props();
	const { showData } = data;

	const isDemo = $page.url.searchParams.has('demo');

	let currentTime = $state(new Date(isDemo ? showData.shows[0].timestamp : Date.now()));
	let nextShowsLive = $derived(getNextShows(showData.shows, currentTime));
	let numberOfNextShows = $derived(nextShowsLive.length);

	let showIterator = $state(0);
	let show = $derived(nextShowsLive[showIterator]);
	let walkInCovers = $derived(show.cast.roles.filter((role) => role.isWalkInCover));

	const MAX_PROGRESS_TIME = 15; // in seconds
	let progress = $state(0);

	setInterval(() => {
		currentTime = new Date(isDemo ? showData.shows[0].timestamp : Date.now());

		progress += 0.01;
		if (progress > MAX_PROGRESS_TIME) {
			progress = 0;
			showIterator = (showIterator + 1) % numberOfNextShows;
		}
	}, 10); // 100 times per second
</script>

{#if numberOfNextShows > 1}
	<div style="display:flex; justify-content: stretch; margin: 1rem 0; gap: 1rem;">
		{#each nextShowsLive as show, i}
			<progress
				max={MAX_PROGRESS_TIME}
				value={showIterator === i ? progress : showIterator > i ? MAX_PROGRESS_TIME : 0}
			></progress>
		{/each}
	</div>
{/if}

<h1>{showData.common.title}</h1>

<p class="ta-center">
	<span class="c-prim-fg-1 fw-strong">
		{new Date(show.timestamp).toLocaleString('de-DE', {
			dateStyle: 'full',
			timeStyle: 'short'
		})}
	</span><br />
	{show.companies.join(', ')}
</p>

<h2>Cast</h2>

<ul class="dot-list">
	{#each show.cast.roles as role}
		<li class="dot-list__item">
			<span class="dot-list__label fw-strong"><span>{role.role}</span></span>
			<span class="dot-list__label"
				><span
					>{role.persons
						.map((str) => {
							if (role.isWalkInCover) {
								str = str + '*';
							}
							return str.replace(' ', ' ');
						})
						.join(', ')}</span
				></span
			>
		</li>
	{/each}
</ul>

{#if walkInCovers.length > 0}
	<h3>Kurzfristige Umbesetzung</h3>

	<p>
		In der heutigen Show wird auf Grund von krankheitsbedingten Ausfällen
		{#each walkInCovers as role}
			<span class="fw-strong">{role.role.replaceAll(' ', ' ')}</span> gespielt von
			<span class="fw-strong">{role.persons.join(', ')}</span
			>{#if role !== walkInCovers[walkInCovers.length - 1]}{' und '}{:else}.{/if}
		{/each}
	</p>
{/if}

<h2>Ensemble</h2>

<p>{show.cast.ensemble.map((str) => str.replace(' ', ' ')).join(', ')}</p>

{#if nextShowsLive.length === 0}
	<p class="ta-center">Aktuell keine aktive Veranstaltung...</p>
{/if}

<p class="fs-xxs c-fg-3">
	{new Date(currentTime).toLocaleString('en-GB', {
		dateStyle: 'short',
		timeStyle: 'long'
	})}
</p>
