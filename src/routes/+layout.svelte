<script lang="ts">
	import '../app.pcss';
	import type { Snippet } from 'svelte';

	const { children } = $props<{ children: Snippet }>();
</script>

{@render children()}
