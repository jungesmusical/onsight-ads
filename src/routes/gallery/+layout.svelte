<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children } = $props<{ children: Snippet }>();
</script>

test2
{@render children()}
