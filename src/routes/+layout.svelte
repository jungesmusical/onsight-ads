<script lang="ts">
	import '../app.pcss';
</script>

<!-- <video autoplay loop muted playsinline poster="/artwork-poster.jpg" class="artwork">
	<source src="/artwork.mp4" type="video/mp4" />
</video> -->

<img src="/artwork-poster.jpg" alt="Artwork" class="artwork" />

<main>
	<slot></slot>
</main>

<style>
	.artwork {
		margin: var(--m);
		padding: 0;
		object-fit: cover;
		object-position: center;
		width: calc(100% - 2 * var(--m));
		max-width: none;
		aspect-ratio: 21 / 9;
		border-radius: var(--m);
		overflow: hidden;
	}
</style>
