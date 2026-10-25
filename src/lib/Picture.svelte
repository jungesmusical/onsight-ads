<script lang="ts">
	import type { Image } from './Production';

	const {
		image,
		class: className,
		loading,
		objectPosition = image.focus
	}: {
		image: Image;
		class?: string;
		loading?: 'lazy' | 'eager';
		/** Überschreibt den Fokuspunkt des Bildes. */
		objectPosition?: string;
	} = $props();
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
		style="object-position: {objectPosition}"
	/>
</picture>
