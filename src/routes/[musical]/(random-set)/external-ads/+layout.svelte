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
		padding: var(--m);
		gap: var(--m);
		max-height: 100vh;
		height: calc(100vh - 2 * var(--m));
		overflow: hidden;
		display: grid;
		align-items: stretch;
		grid-template-columns: 1fr;
		grid-template-rows: 7fr 1fr;
	}
</style>
