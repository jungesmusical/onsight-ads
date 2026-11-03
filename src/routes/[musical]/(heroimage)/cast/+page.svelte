<script lang="ts">
	import type { PageData } from './$types';
	import { env } from '$env/dynamic/public';
	import { joinNames } from '$lib/joinNames';
	import { personNames } from '$lib/personNames';
	import RoleList from '$lib/RoleList.svelte';
	import RolePhotoGrid from '$lib/RolePhotoGrid.svelte';
	import ShowRotation from '$lib/ShowRotation.svelte';

	const { data } = $props<{ data: PageData }>();
	const showData = $derived(data.showData);
	const showPhotos = env.PUBLIC_SHOW_CAST_PHOTOS === 'true';
</script>

<ShowRotation
	{showData}
	title={(show) => (show.cast.length > 0 ? 'Cast' : 'Ensemble')}
	date={data.date}
>
	{#snippet children(show)}
		{@const walkInCovers = show.cast.filter((role) => role.walkInCover)}

		{#if show.cast.length > 0}
			{#if showPhotos}
				<RolePhotoGrid roles={show.cast} people={showData.people} markWalkIn />
			{:else}
				<RoleList roles={show.cast} people={showData.people} markWalkIn />
			{/if}

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

		{#if show.cast.length === 0 && showPhotos}
			<RolePhotoGrid roles={[{ roleName: '', members: show.ensemble }]} people={showData.people} />
		{:else if show.ensemble.length > 0}
			{@const ensembleNames = joinNames(personNames(show.ensemble, showData.people), {
				withAnd: false
			})}

			{#if show.cast.length > 0}
				<h3 class="fs-m">In weiteren Rollen</h3>

				<p class="no-hyphens ta-center fs-xs">{ensembleNames}</p>
			{:else}
				<p class="no-hyphens ta-center">{ensembleNames}</p>
			{/if}
		{/if}
	{/snippet}
</ShowRotation>
