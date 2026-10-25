<script lang="ts">
	import type { Production } from '$lib';
	import Picture from '$lib/Picture.svelte';
	import type { PageData } from './$types';
	import * as sharedStore from '../store.svelte';

	const { data } = $props<{ data: PageData }>();
	const showData: Production = $derived(data.showData);

	let currentNumItem = $state(0);
	sharedStore.numItem.subscribe((value) => {
		currentNumItem = value;
	});

	const singleAd = $derived(showData.externalAds[currentNumItem]);
</script>

{#if singleAd?.media?.type === 'image'}
	<Picture image={singleAd.media} class="ad-image" />
{:else if singleAd?.media?.type === 'video'}
	<video autoplay loop muted playsinline poster={singleAd.media.poster ?? undefined}>
		<source src={singleAd.media.src} type={singleAd.media.mimeType} />
		Your browser does not support the video tag.
	</video>
{:else}
	<p>Kein gültiges Werbematerial gefunden.</p>
{/if}

<header class="flow flow--gap-0 ta-center">
	{#if singleAd?.company}
		<p class="fs-xxs c-fg-3">Anzeige von</p>
		<h1 class=" typo-heading-2">{singleAd.company}</h1>
	{/if}
</header>

<style lang="scss">
	header {
		align-self: center;
		justify-self: center;
	}

	:global(picture:has(> .ad-image)) {
		display: block;
		align-self: stretch;
		justify-self: stretch;
		width: 100%;
		height: 100%;
	}

	:global(.ad-image) {
		width: 100%;
		height: 100%;
		aspect-ratio: 1 / 1.414;
		object-fit: contain;
	}

	video {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>
