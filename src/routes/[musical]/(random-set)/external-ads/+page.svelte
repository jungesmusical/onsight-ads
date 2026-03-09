<script lang="ts">
	import type { ShowData } from '$lib';
	import type { PageData } from './$types';
	import * as sharedStore from '../store.svelte';

	const { data } = $props<{ data: PageData }>();
	const showData: ShowData = $derived(data.showData);

	let currentNumItem = $state(0);
	sharedStore.numItem.subscribe((value) => {
		currentNumItem = value;
	});

	const singleAd = $derived(showData.common.externalAds?.[currentNumItem]);
</script>

{#if singleAd?.media.type === 'image'}
	<picture>
		{#each singleAd.media.source as source}
			<source srcset={source.srcset} type={source.type} />
		{/each}
		<img
			src={singleAd.media.img.src}
			alt={singleAd.media.img.alt}
			style="object-position: {singleAd.media.img.focus ?? '50% 50%'}"
		/>
	</picture>
{:else if singleAd?.media.type === 'video'}
	<video autoplay loop muted playsinline poster={singleAd.media.video.poster ?? undefined}>
		{#each singleAd.media.source as source}
			<source src={source.src} type={source.type} />
		{/each}
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

	picture {
		display: block;
		align-self: stretch;
		justify-self: stretch;
		width: 100%;
		height: 100%;
	}

	img {
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
