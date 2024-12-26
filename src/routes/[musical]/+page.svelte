<script lang="ts">
	import type { PageData } from './$types';
	import type { ShowData, SingleShow } from '$lib/ShowData';

  function getNextShows( shows: ShowData['shows'], currentDate = new Date()): SingleShow[] {
    const nextShows: SingleShow[] = [];

    shows.forEach((show) => {
      const start = new Date(show.timestamp)
      start.setTime(start.getTime() - 1000 * 60 * 60 * 1.5); // 1.5 hours before show start

      const end = new Date(show.timestamp)
      end.setTime(end.getTime() + 1000 * 60 * 60 * 3); // 4 hours after show start

      if (start < currentDate && currentDate < end) {
        nextShows.push(show);
      }
    });

    return nextShows;
  }

  let { data }: { data: PageData } = $props();
	const { showData } = data;

  const TEST_DATE = new Date('2025-03-21 20:00:00');

  let currentTime = $state(new Date(TEST_DATE));

  setInterval(() => {
    currentTime = new Date(TEST_DATE);
  }, 1000 * 60);

  let nextShowsLive = $derived(getNextShows(showData.shows, currentTime));
</script>

<h1>{showData.common.title}</h1>

<p>{showData.common.venue.name} in {showData.common.venue.city}</p>


{#each nextShowsLive as show}
  {show.timestamp}

  <p>Es spielt {show.companies.join(', ')}</p>

  <h2> Cast </h2>

  <dl>

  {#each show.cast.roles as role}

    <dt>{role.role}{(role.isWalkInCover ? ' (Walk-In Cover)' : '')}</dt>
    <dd>{role.persons.join(', ')}</dd>

  {/each}

  </dl>

  {@const walkInCovers = show.cast.roles.filter(role => role.isWalkInCover)}

  {#if walkInCovers.length > 0}
    <h2> Walk-In Covers </h2>

    <dl>

    {#each walkInCovers as role}

      <dt>{role.role}</dt>
      <dd>{role.persons.join(', ')}</dd>

    {/each}

    </dl>
  {/if}

  <h2> Ensemble </h2>

  <p>{ show.cast.ensemble.join(', ') }</p>

{/each}

{#if nextShowsLive.length === 0}
  <p>No shows currently live</p>
{/if}



<p>{currentTime}</p>
