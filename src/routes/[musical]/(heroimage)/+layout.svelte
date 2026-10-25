<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Picture from '$lib/Picture.svelte';

	const { data, children } = $props<{ data: LayoutData; children: Snippet }>();
	const showData = $derived(data.showData);
	const disableHeaderVideo = $derived(data.disableHeaderVideo ?? false);
</script>

{#if !disableHeaderVideo && showData.video}
	<video autoplay loop muted playsinline poster={showData.video.poster} class="artwork">
		<source src={showData.video.src} type={showData.video.mimeType} />
	</video>
{:else if showData.image}
	<Picture image={showData.image} class="artwork" />
{/if}

<main>
	{@render children()}
</main>

<style>
	:global(picture:has(> .artwork)) {
		display: contents;
	}
	:global(.artwork) {
		margin: var(--m);
		padding: 0;
		object-fit: cover;
		object-position: center;
		width: calc(100% - var(--m) - var(--m));
		max-width: none;
		aspect-ratio: 21 / 9;
		border-radius: var(--m);
		overflow: hidden;
	}
</style>
