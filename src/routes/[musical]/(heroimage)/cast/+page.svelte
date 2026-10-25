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
		{@const walkInCovers = show.cast.filter((role) => role.walkInCover)}

		{#if show.cast.length > 0}
			<h2>Cast</h2>

			<RoleList roles={show.cast} people={showData.people} markWalkIn />

			{#if walkInCovers.length > 0}
				<div class="card">
					<p>
						In der heutigen Show wird auf Grund von krankheitsbedingten Ausfällen
						{#each walkInCovers as role}
							<span class="fw-strong">{role.roleName.replaceAll(' ', ' ')}</span> gespielt von
							<span class="fw-strong">{joinNames(personNames(role.members, showData.people))}</span
							>{#if role !== walkInCovers[walkInCovers.length - 1]}{' und '}{:else}.{/if}
						{/each}
					</p>
				</div>
			{/if}
		{/if}

		{#if show.ensemble.length > 0}
			<h2>Ensemble</h2>

			<p class="no-hyphens ta-center">
				{joinNames(personNames(show.ensemble, showData.people))}
			</p>
		{/if}
	{/snippet}
</ShowRotation>
