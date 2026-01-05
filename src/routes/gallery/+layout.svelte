<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children } = $props<{ children: Snippet }>();
</script>

<main>
	{@render children()}
</main>

<style>
	main {
		max-width: none;
		padding: 0;
		aspect-ratio: 9 / 16;
		max-height: 100vh;
		overflow: hidden;
	}
</style>
