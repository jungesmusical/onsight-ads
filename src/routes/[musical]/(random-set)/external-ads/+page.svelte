<script lang="ts">
	import type { Production } from '$lib';
	import Picture from '$lib/Picture.svelte';
	import { rotationHold } from '$lib/rotationHold';
	import type { PageData } from './$types';
	import * as sharedStore from '../store.svelte';

	const { data } = $props<{ data: PageData }>();
	const showData: Production = $derived(data.showData);

	let currentNumItem = $state(0);
	sharedStore.numItem.subscribe((value) => {
		currentNumItem = value;
	});

	const singleAd = $derived(showData.externalAds[currentNumItem]);

	// the kiosk waits for the first full playthrough of a video ad only
	$effect(() => {
		rotationHold.set(singleAd?.media?.type === 'video');
		return () => rotationHold.set(false);
	});

	function replayAfterEnd(event: Event) {
		rotationHold.set(false);
		(event.currentTarget as HTMLVideoElement).play();
	}
</script>

{#if singleAd?.media?.type === 'image'}
	<Picture image={singleAd.media} class="ad-media" />
{:else if singleAd?.media?.type === 'video'}
	{#key singleAd.media.src}
		<video
			class="ad-media"
			autoplay
			muted
			playsinline
			disablepictureinpicture
			width={singleAd.media.width ?? undefined}
			height={singleAd.media.height ?? undefined}
			poster={singleAd.media.poster ?? undefined}
			onended={replayAfterEnd}
		>
			<!-- a failed source fires `error` here, not on the video -->
			<source
				src={singleAd.media.src}
				type={singleAd.media.mimeType}
				onerror={() => rotationHold.set(false)}
			/>
		</video>
	{/key}
{:else}
	<p>Kein gültiges Werbematerial gefunden.</p>
{/if}

{#if singleAd?.company}
	<p class="ad-notice fs-xxs c-fg-3">Anzeige von {singleAd.company}</p>
{/if}

<style lang="scss">
	:global(picture:has(> .ad-media)) {
		display: block;
		width: 100%;
		height: 100%;
	}

	:global(.ad-media) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.ad-notice {
		position: absolute;
		right: var(--xs);
		bottom: var(--xs);
		margin: 0;
		padding: 0.2em 0.5em;
		border-radius: 0.25em;
		background: rgb(0 0 0 / 0.5);
	}
</style>
