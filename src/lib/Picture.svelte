<script lang="ts">
	import type { Image } from './Production';

	const {
		image,
		class: className,
		loading
	}: { image: Image; class?: string; loading?: 'lazy' | 'eager' } = $props();
</script>

<picture>
	<source srcset={image.srcset.avif} type="image/avif" />
	<source srcset={image.srcset.webp} type="image/webp" />
	<img
		class={className}
		src={image.src}
		srcset={image.srcset.default}
		alt={image.alt}
		width={image.width}
		height={image.height}
		{loading}
		style="object-position: {image.focus}"
	/>
</picture>
