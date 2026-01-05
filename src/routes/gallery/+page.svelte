<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const showData = $derived(data.showData);

	const gallery = $derived(showData.common.gallery[0]);
</script>

<div class="gallery-grid">
	{#each gallery.images as image}
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
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		grid-template-rows: repeat(5, minmax(0, 1fr));
		gap: var(--xxs);
		padding: var(--xxs);
		max-height: calc(100vh - 2 * var(--xxs));

		&:has(:nth-child(10)) {
			grid-template-areas:
				'gallery_item_1 gallery_item_1 gallery_item_2'
				'gallery_item_3 gallery_item_4 gallery_item_4'
				'gallery_item_5 gallery_item_5 gallery_item_6'
				'gallery_item_7 gallery_item_8 gallery_item_8'
				'gallery_item_9 gallery_item_9 gallery_item_10';
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
