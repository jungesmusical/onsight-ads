<script lang="ts">
  import type { PageData } from './$types';

  const { data } = $props<{ data: PageData }>();
</script>

<main>
	<h1>OnSight Ads</h1>

	<ul aria-label="Erreichbare Produktionen">
    {#each data.productionsData.productions as production}
      <li><a href="/{production.slug}">{production.title}</a></li>
    {/each}
	</ul>
</main>

<footer>
	<p class="ta-center c-sec-fg-2 fs-small">
		Erstellt mit ❤️ von Finn Maybauer für das Junge Musical Leverkusen e.V.
	</p>
</footer>
