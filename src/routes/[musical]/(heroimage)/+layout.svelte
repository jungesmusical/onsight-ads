<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	const { data, children } = $props<{ data: LayoutData; children: Snippet }>();
	const showData = $derived(data.showData);
</script>

{#if showData?.common?.media?.video}
	<video
		autoplay
		loop
		muted
		playsinline
		poster={showData.common.media.video.video.poster}
		class="artwork"
	>
		{#each showData.common.media.video.source as source}
			<source src={source.src} type={source.type} />
		{/each}
	</video>
{:else if showData?.common?.media?.image}
	<picture>
		{#each showData.common.media.image.source as source}
			<source srcset={source.srcset} type={source.type} />
		{/each}
		<img
			class="artwork"
			src={showData.common.media.image.img.src}
			srcset={showData.common.media.image.img.srcset}
			alt={showData.common.media.image.img.alt}
		/>
	</picture>
{/if}

<main>
	{@render children()}
</main>

<style>
	picture {
		display: contents;
	}
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
