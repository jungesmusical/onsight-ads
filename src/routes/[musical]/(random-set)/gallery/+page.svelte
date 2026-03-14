<script lang="ts">
	import type { ShowData } from '$lib';
	import type { PageData } from './$types';
	import * as sharedStore from '../store.svelte';

	const { data } = $props<{ data: PageData }>();
	const showData: ShowData = $derived(data.showData);
	const debug: boolean = $derived(data.debug);

	let currentNumItem = $state(0);
	sharedStore.numItem.subscribe((value) => {
		currentNumItem = value;
	});

	const gallery = $derived(showData.common.gallery?.[currentNumItem]);
	const limitedImages = $derived(gallery?.images.slice(0, 10) ?? []);
	const imageCount = $derived(limitedImages.length);
</script>

{#if !gallery}
	<p>Keine Galerie gefunden.</p>
{:else}
	<header class="gallery-heading">
		{#if gallery.showId === showData.common.showId}
			<h1>{gallery.title}</h1>
		{:else}
			<h1>{gallery.title} <span>({gallery.year})</span></h1>
			{#if gallery.subtitle}
				<p class="gallery-heading__subtitle">{gallery.subtitle}</p>
			{/if}
		{/if}

		{#if gallery.photographers && gallery.photographers.length > 0}
			<p class="gallery-heading__photographers">Fotos von: {gallery.photographers.join(', ')}</p>
		{/if}
	</header>

	{#if debug}
		<nav class="gallery-nav">
			<ul>
				{#each showData.common.gallery as item, index}
					<li>
						<button
							onclick={() => sharedStore.numItem.set(index)}
							class:active={index === currentNumItem}
						>
							{item.title} ({item.year})
						</button>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}

	<div class={`gallery-grid items-${imageCount}`}>
		{#each limitedImages as image}
			<div class="gallery-grid__item">
				<picture>
					{#each image.source as source}
						<source srcset={source.srcset} type={source.type} />
					{/each}
					<img
						src={image.img.src}
						alt={image.img.alt}
						loading="lazy"
						style="object-position: {image.img.focus ?? '50% 50%'}"
					/>
				</picture>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	picture {
		display: block;
		width: 100%;
		height: 100%;
	}
	.gallery-grid {
		--numOfRows: 6;
		--numOfCols: 3;
		display: grid;
		grid-template-columns: repeat(var(--numOfCols), minmax(0, 1fr));
		grid-template-rows: repeat(var(--numOfRows), minmax(0, 1fr));
		gap: var(--xxs);
		padding: var(--xxs);
		height: 100%;
		height: calc(100vh - var(--xxs) - var(--xxs));
		position: relative;

		&.items-10 {
			--numOfRows: 5;
			--numOfCols: 3;

			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_2'
				'gallery_item_3 gallery_item_4 gallery_item_4'
				'gallery_item_5 gallery_item_5 gallery_item_6'
				'gallery_item_7 gallery_item_8 gallery_item_8'
				'gallery_item_9 gallery_item_9 gallery_item_10';

			@media (orientation: landscape) {
				--numOfRows: 3;
				--numOfCols: 5;

				grid-template-areas:
					'gallery_item_1 gallery_item_1 gallery_item_2 gallery_item_2 gallery_item_3'
					'gallery_item_4 gallery_item_5 gallery_item_5 gallery_item_6 gallery_item_6'
					'gallery_item_7 gallery_item_8 gallery_item_9 gallery_item_9 gallery_item_10';
			}
		}

		&.items-9 {
			--numOfRows: 5;
			--numOfCols: 3;

			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_2'
				'gallery_item_3 gallery_item_4 gallery_item_4'
				'gallery_item_5 gallery_item_5 gallery_item_6'
				'gallery_item_7 gallery_item_8 gallery_item_8'
				'gallery_item_9 gallery_item_9 gallery_item_9';
		}

		&.items-8 {
			--numOfRows: 6;
			--numOfCols: 3;

			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_2'
				'gallery_item_3 gallery_item_3 gallery_item_2'
				'gallery_item_4 gallery_item_4 gallery_item_5'
				'gallery_item_4 gallery_item_4 gallery_item_6'
				'gallery_item_7 gallery_item_7 gallery_item_8'
				'gallery_item_7 gallery_item_7 gallery_item_8';
		}

		&.items-7 {
			--numOfRows: 6;
			--numOfCols: 4;

			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_2 gallery_item_2'
				'gallery_item_3 gallery_item_3 gallery_item_2 gallery_item_2'
				'gallery_item_3 gallery_item_3 gallery_item_4 gallery_item_4'
				'gallery_item_5 gallery_item_5 gallery_item_4 gallery_item_4'
				'gallery_item_6 gallery_item_6 gallery_item_4 gallery_item_4'
				'gallery_item_6 gallery_item_6 gallery_item_7 gallery_item_7';
		}

		&.items-6 {
			--numOfRows: 3;
			--numOfCols: 3;

			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_2'
				'gallery_item_3 gallery_item_4 gallery_item_4'
				'gallery_item_5 gallery_item_5 gallery_item_6';

			@media (orientation: landscape) {
				--numOfRows: 2;
				--numOfCols: 6;

				grid-template-areas:
					'gallery_item_1 gallery_item_1 gallery_item_1 gallery_item_2 gallery_item_3 gallery_item_3'
					'gallery_item_4 gallery_item_4 gallery_item_5 gallery_item_5 gallery_item_5 gallery_item_6';
			}
		}

		&.items-5 {
			--numOfCols: 3;
			--numOfRows: 3;

			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_2'
				'gallery_item_3 gallery_item_4 gallery_item_4'
				'gallery_item_5 gallery_item_5 gallery_item_5';

			@media (orientation: landscape) {
				--numOfCols: 3;
				--numOfRows: 2;

				grid-template-areas:
					'gallery_item_1 gallery_item_2 gallery_item_3'
					'gallery_item_4 gallery_item_4 gallery_item_5';
			}
		}

		&.items-4 {
			--numOfCols: 3;
			--numOfRows: 3;

			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_1'
				'gallery_item_2 gallery_item_3 gallery_item_3'
				'gallery_item_4 gallery_item_4 gallery_item_4';

			@media (orientation: landscape) {
				--numOfCols: 3;
				--numOfRows: 2;

				grid-template-areas:
					'gallery_item_1 gallery_item_1 gallery_item_2'
					'gallery_item_3 gallery_item_4 gallery_item_4';
			}
		}

		&.items-3 {
			--numOfCols: 1;
			--numOfRows: 3;

			grid-template-areas:
				'gallery_item_1'
				'gallery_item_2'
				'gallery_item_3';

			@media (orientation: landscape) {
				--numOfCols: 3;
				--numOfRows: 1;

				grid-template-areas: 'gallery_item_1 gallery_item_2 gallery_item_3';
			}
		}

		&.items-2 {
			--numOfCols: 1;
			--numOfRows: 2;

			grid-template-areas:
				'gallery_item_1'
				'gallery_item_2';

			@media (orientation: landscape) {
				--numOfCols: 2;
				--numOfRows: 1;

				grid-template-areas: 'gallery_item_1 gallery_item_2';
			}
		}

		&.items-1 {
			--numOfCols: 1;
			--numOfRows: 1;

			grid-template-areas: 'gallery_item_1';
		}

		&__item {
			@for $i from 1 through 10 {
				&:nth-child(#{$i}) {
					grid-area: gallery_item_#{$i};
				}
			}

			img {
				display: block;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}

	.gallery-heading {
		--margin-overlap: 12rem;
		--padding-inner: 6rem;

		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: var(--padding-inner);
		padding-top: calc(var(--xxl) + var(--margin-overlap));
		color: white;
		z-index: 1;
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0) 0,
			rgba(0, 0, 0, 0.66) var(--margin-overlap)
		);

		h1 {
			font-size: var(--fs-l);
			font-weight: var(--fw-strong);
			text-align: start;
			margin: 0;
			line-height: 1;

			span {
				font-weight: var(--fw-regular);
			}
		}

		&__subtitle {
			margin-top: var(--xxs);
			font-size: var(--fs-xs);
		}

		&__photographers {
			font-size: var(--fs-xxs);
			color: var(--c-fg-3);
			margin-top: var(--xs);
			margin-bottom: calc(0px - var(--xs));
		}
	}

	.gallery-nav {
		position: absolute;
		top: var(--xxs);
		left: var(--xxs);
		z-index: 2;

		ul {
			display: flex;
			flex-direction: column;
			gap: var(--xxs);
			list-style: none;
			padding: 0;
			margin: 0;

			button {
				color: white;
				text-decoration: none;
				font-size: var(--fs-xxs);
				padding: var(--xxs);
				background-color: rgba(0, 0, 0, 0.5);
				border-radius: var(--xs);

				&.active {
					background-color: rgba(255, 255, 255, 0.8);
					color: black;
					font-weight: var(--fw-strong);
				}
			}
		}
	}
</style>
