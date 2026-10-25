<script lang="ts">
	import type { PageData } from './$types';
	import { joinNames } from '$lib/joinNames';
	import { personNames } from '$lib/personNames';
	import RoleList from '$lib/RoleList.svelte';
	import ShowRotation from '$lib/ShowRotation.svelte';

	const { data } = $props<{ data: PageData }>();
	const showData = $derived(data.showData);
</script>

<ShowRotation {showData} date={data.date}>
	{#snippet children(show)}
		<h2>Orchester</h2>

		{#if show.conductors.length > 0}
			<p class="ta-center">
				Die heutige Show wird dirigiert von {joinNames(
					personNames(show.conductors, showData.people)
				)}.
			</p>
		{/if}

		<RoleList roles={show.orchestra} people={showData.people} />
	{/snippet}
</ShowRotation>
