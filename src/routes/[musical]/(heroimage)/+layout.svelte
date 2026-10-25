<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import type { Image } from '$lib';
	import Picture from '$lib/Picture.svelte';

	const VISIBLE_RATIO = 9 / 21;
	const BOX_RATIO = 12 / 21;

	// Verschiebt den Fokus so, dass der obere 21/9-Bereich den Ausschnitt der niedrigeren Box zeigt
	function heroObjectPosition({ focus, width, height }: Image): string {
		const ratio = height / width;
		const [x, y] = focus.split(' ');
		const focusY = parseFloat(y);
		if (ratio <= BOX_RATIO || Number.isNaN(focusY)) return focus;

		const shiftedY = (focusY * (ratio - VISIBLE_RATIO)) / (ratio - BOX_RATIO);
		return `${x} ${Math.min(100, shiftedY)}%`;
	}

	const { data, children } = $props<{ data: LayoutData; children: Snippet }>();
	const showData = $derived(data.showData);
	const disableHeaderVideo = $derived(data.disableHeaderVideo ?? false);
</script>

{#if !disableHeaderVideo && showData.video}
	<div class="artwork">
		<video autoplay loop muted playsinline poster={showData.video.poster}>
			<source src={showData.video.src} type={showData.video.mimeType} />
		</video>
	</div>
{:else if showData.image}
	<div class="artwork">
		<Picture image={showData.image} objectPosition={heroObjectPosition(showData.image)} />
	</div>
{/if}

<main>
	{@render children()}
</main>

<style>
	.artwork {
		position: relative;
		isolation: isolate;
		margin: -2rem 0 -5%;
		padding: 0;
		max-width: none;
		aspect-ratio: 21 / 12;
		overflow: hidden;
		mask-image: linear-gradient(to bottom, black 75%, transparent);
	}

	main {
		position: relative;
		z-index: 1;
	}

	.artwork :global(picture) {
		display: contents;
	}

	.artwork video,
	.artwork :global(img) {
		display: block;
		width: 100%;
		max-width: none;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	/* Körnung im Auslauf gegen Banding im Verlauf */
	.artwork::after {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
		background-size: 200px;
		mix-blend-mode: overlay;
		opacity: 0.4;
		mask-image: linear-gradient(to bottom, transparent 50%, black);
	}
</style>
