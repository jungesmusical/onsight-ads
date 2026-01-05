<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const showData = $derived(data.showData);

	const gallery = $derived(showData.common.gallery[0]);

  let counter = 0;
</script>

<div class="gallery-grid">
	{#each gallery.images as image}
    {#if counter++ < 2}
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
    {/if}
	{/each}
</div>

<style lang="scss">
	picture {
		display: contents;
	}
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		grid-template-rows: repeat(6, minmax(0, 1fr));
		gap: var(--xxs);
		padding: var(--xxs);
		height: calc(100vh - 2 * var(--xxs));

		&:has(:nth-child(10)):not(:has(:nth-child(11))) {
			grid-template-rows: repeat(5, minmax(0, 1fr));

			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_2'
				'gallery_item_3 gallery_item_4 gallery_item_4'
				'gallery_item_5 gallery_item_5 gallery_item_6'
				'gallery_item_7 gallery_item_8 gallery_item_8'
				'gallery_item_9 gallery_item_9 gallery_item_10';
		}

		&:has(:nth-child(9)):not(:has(:nth-child(10))) {
			grid-template-rows: repeat(5, minmax(0, 1fr));

			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_2'
				'gallery_item_3 gallery_item_4 gallery_item_4'
				'gallery_item_5 gallery_item_5 gallery_item_6'
				'gallery_item_7 gallery_item_8 gallery_item_8'
				'gallery_item_9 gallery_item_9 gallery_item_9';
		}

		&:has(:nth-child(8)):not(:has(:nth-child(9))) {
			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_2'
				'gallery_item_3 gallery_item_3 gallery_item_2'
				'gallery_item_4 gallery_item_4 gallery_item_5'
				'gallery_item_4 gallery_item_4 gallery_item_6'
				'gallery_item_7 gallery_item_7 gallery_item_8'
				'gallery_item_7 gallery_item_7 gallery_item_8';
		}

    &:has(:nth-child(7)):not(:has(:nth-child(8))) {
		  grid-template-columns: repeat(4, minmax(0, 1fr));
			grid-template-areas:
        'gallery_item_1 gallery_item_1 gallery_item_2 gallery_item_2'
        'gallery_item_3 gallery_item_3 gallery_item_2 gallery_item_2'
        'gallery_item_3 gallery_item_3 gallery_item_4 gallery_item_4'
        'gallery_item_5 gallery_item_5 gallery_item_4 gallery_item_4'
        'gallery_item_6 gallery_item_6 gallery_item_4 gallery_item_4'
        'gallery_item_6 gallery_item_6 gallery_item_7 gallery_item_7';
		}

    &:has(:nth-child(6)):not(:has(:nth-child(7))) {
		  grid-template-rows: repeat(3, minmax(0, 1fr));

			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_2'
				'gallery_item_3 gallery_item_4 gallery_item_4'
				'gallery_item_5 gallery_item_5 gallery_item_6';
		}

    &:has(:nth-child(5)):not(:has(:nth-child(6))) {
		  grid-template-rows: repeat(3, minmax(0, 1fr));

			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_1'
				'gallery_item_2 gallery_item_3 gallery_item_3'
				'gallery_item_4 gallery_item_4 gallery_item_5';
		}

    &:has(:nth-child(4)):not(:has(:nth-child(5))) {
		  grid-template-rows: repeat(3, minmax(0, 1fr));

			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_1'
				'gallery_item_2 gallery_item_3 gallery_item_3'
				'gallery_item_4 gallery_item_4 gallery_item_4';
		}

    &:has(:nth-child(3)):not(:has(:nth-child(4))) {
		  grid-template-rows: repeat(3, minmax(0, 1fr));

			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_1'
				'gallery_item_2 gallery_item_2 gallery_item_2'
				'gallery_item_3 gallery_item_3 gallery_item_3';
		}

    &:has(:nth-child(2)):not(:has(:nth-child(3))) {
		  grid-template-rows: repeat(2, minmax(0, 1fr));

			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_1'
				'gallery_item_2 gallery_item_2 gallery_item_2';
		}

    &:has(:nth-child(1)):not(:has(:nth-child(2))) {
		  grid-template-rows: repeat(1, minmax(0, 1fr));

			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_1';
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
</style>
