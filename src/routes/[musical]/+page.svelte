<script lang="ts">
	import type { PageData } from './$types';
	import type { ShowData, SingleShow } from '$lib/ShowData';

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

	const TEST_DATE = new Date('2025-03-22 18:00:01');

	let currentTime = $state(new Date());

	setInterval(() => {
		currentTime = new Date();
	}, 1000); // update every second

	let nextShowsLive = $derived(getNextShows(showData.shows, currentTime));
</script>

<h1>{showData.common.title}</h1>

{#each nextShowsLive as show}
	<p class="ta-center">

		<span class="c-prim-fg-1 fw-strong">
			{new Date(show.timestamp).toLocaleString('de-DE', {
				dateStyle: 'full',
				timeStyle: 'short'
			})}
		</span><br>
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

	{@const walkInCovers = show.cast.roles.filter((role) => role.isWalkInCover)}

	{#if walkInCovers.length > 0}
<h3>Kurzfristige Umbesetzung</h3>

		<p>
      In der heutigen Show wird auf Grund von krankheitsbedingten Ausfällen
      {#each walkInCovers as role}
        <span class="fw-strong">{role.role.replaceAll(' ', ' ')}</span> gespielt von <span class="fw-strong">{role.persons.join(', ')}</span>{#if role !== walkInCovers[walkInCovers.length - 1]},{:else}.{/if}
      {/each}
    </p>

	{/if}

	<h2>Ensemble</h2>

	<p>{show.cast.ensemble.join(', ')}</p>
{/each}

{#if nextShowsLive.length === 0}
	<p class="ta-center">Aktuell keine aktive Veranstaltung...</p>
{/if}

<p class="fs-xxs c-fg-3">
	{new Date(currentTime).toLocaleString('en-GB', {
		dateStyle: 'short',
		timeStyle: 'long'
	})}
</p>
