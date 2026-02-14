<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const showData = $derived(data.showData);
	const numItem = $derived(data.numItem);
	const gallery = $derived(showData.common.gallery[numItem]);
	const limitedImages = $derived(gallery.images.slice(0, 7));
</script>

<header class="gallery-heading">
	<h1>{gallery.title} <span>({gallery.year})</span></h1>
	{#if gallery.subtitle}
		<p>{gallery.subtitle}</p>
	{/if}
</header>

<div class="gallery-grid">
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

<style lang="scss">
	picture {
		display: contents;
	}
	.gallery-grid {
		--numOfRows: 6;
		--numOfCols: 3;
		display: grid;
		grid-template-columns: repeat(var(--numOfCols), minmax(0, 1fr));
		grid-template-rows: repeat(var(--numOfRows), minmax(0, 1fr));
		gap: var(--xxs);
		padding: var(--xxs);
		height: calc(100vh - 2 * var(--xxs));
		position: relative;

		@mixin numberOfItems($n) {
			&:has(> :nth-child(#{$n})):not(:has(> :nth-child(#{$n + 1}))) {
				@content;
			}
		}

		@include numberOfItems(10) {
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

		@include numberOfItems(9) {
			--numOfRows: 5;
			--numOfCols: 3;

			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_2'
				'gallery_item_3 gallery_item_4 gallery_item_4'
				'gallery_item_5 gallery_item_5 gallery_item_6'
				'gallery_item_7 gallery_item_8 gallery_item_8'
				'gallery_item_9 gallery_item_9 gallery_item_9';
		}

		@include numberOfItems(8) {
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

		@include numberOfItems(7) {
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

		@include numberOfItems(6) {
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

		@include numberOfItems(5) {
			--numOfCols: 3;
			--numOfRows: 3;

			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_1'
				'gallery_item_2 gallery_item_3 gallery_item_3'
				'gallery_item_4 gallery_item_4 gallery_item_5';

			@media (orientation: landscape) {
				--numOfCols: 3;
				--numOfRows: 2;

				grid-template-areas:
					'gallery_item_1 gallery_item_2 gallery_item_3'
					'gallery_item_4 gallery_item_4 gallery_item_5';
			}
		}

		@include numberOfItems(4) {
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

		@include numberOfItems(3) {
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

		@include numberOfItems(2) {
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

		@include numberOfItems(1) {
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
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}

	.gallery-heading {
		--margin-overlap: 6rem;
		--padding-inner: 8rem;

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
	}
</style>
