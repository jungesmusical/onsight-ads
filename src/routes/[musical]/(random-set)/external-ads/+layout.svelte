<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children } = $props<{ children: Snippet }>();
</script>

<main>
	{@render children()}
</main>

<style>
	main {
		position: relative;
		max-width: none;
		box-sizing: border-box;
		padding: var(--m);
		height: 100vh;
		overflow: hidden;
		display: grid;
		grid-template: 100% / 100%;
	}
</style>
