<script lang="ts">
	import type { PageData } from './$types';

  const { data } = $props<{ data: PageData; }>();
	const showData = $derived(data.showData);
</script>

<h2>Hinweis</h2>

{#if showData.common.disclaimer}
	{#each showData.common.disclaimer.split('\n') as block}
		{#if block !== ''}
			<p class="fs-l ta-center">{block}</p>
		{/if}
	{/each}
{/if}

<style>
	p,
	h2 {
		text-wrap: balance;
		line-height: 140%;
		margin-bottom: 1.5em;
	}
</style>
