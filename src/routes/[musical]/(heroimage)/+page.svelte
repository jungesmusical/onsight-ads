<script lang="ts">
	import type { PageData } from './$types';

	const { params } = $props<{ data: PageData; params: any }>();
</script>

<main>
	<h1>OnSight Ads</h1>

	<ul aria-label="Nutzbare Einzelanzeigen">
		<li><a href="{params.musical}/cast">Cast</a></li>
		<li><a href="{params.musical}/orchester">Orchester</a></li>
		<li><a href="{params.musical}/crew">Crew</a></li>
		<li><a href="{params.musical}/disclaimer">Disclaimer</a></li>
		<li><a href="{params.musical}/gallery">Gallery</a></li>
	</ul>
</main>

<footer>
	<p class="ta-center c-sec-fg-2 fs-small">
		Erstellt mit ❤️ von Finn Maybauer für das Junge Musical Leverkusen e.V.
	</p>
</footer>
