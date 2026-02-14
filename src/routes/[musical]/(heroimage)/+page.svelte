<script lang="ts">
  import type { PageData } from './$types';

  const { data } = $props<{ data: PageData }>();
</script>


<main>
	<h1>OnSight Ads</h1>

	<ul aria-label="Nutzbare Einzelanzeigen">
		<li><a href="{data.musicalSlug}/cast">Cast</a></li>
		<li><a href="{data.musicalSlug}/orchester">Orchester</a></li>
		<li><a href="{data.musicalSlug}/crew">Crew</a></li>
		<li><a href="{data.musicalSlug}/disclaimer">Disclaimer</a></li>
		<li><a href="{data.musicalSlug}/gallery">Gallery</a></li>
	</ul>
</main>

<footer>
	<p class="ta-center c-sec-fg-2 fs-small">
		Erstellt mit ❤️ von Finn Maybauer für das Junge Musical Leverkusen e.V.
	</p>
</footer>
