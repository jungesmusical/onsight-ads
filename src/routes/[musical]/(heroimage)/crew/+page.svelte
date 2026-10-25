<script lang="ts">
	import type { PageData } from './$types';
	import RoleList from '$lib/RoleList.svelte';

	const { data } = $props<{ data: PageData }>();
	const showData = $derived(data.showData);
</script>

<h2>Crew</h2>

<RoleList roles={showData.creativeTeam} people={showData.people} />

{#if showData.foh.length > 0}
	<h3>Technik (FoH)</h3>

	<RoleList roles={showData.foh} people={showData.people} />
{/if}
