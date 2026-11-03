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
	const showPhotos = env.PUBLIC_SHOW_ORCHESTRA_PHOTOS === 'true';
</script>

<ShowRotation {showData} title="Orchester" showCompanies={false} date={data.date}>
	{#snippet children(show)}
		{#if show.conductors.length > 0}
			<p class="ta-center">
				Die heutige Show wird dirigiert von {joinNames(
					personNames(show.conductors, showData.people)
				)}.
			</p>
		{/if}

		{#if showPhotos}
			<RolePhotoGrid roles={show.orchestra} people={showData.people} />
		{:else}
			<RoleList roles={show.orchestra} people={showData.people} />
		{/if}
	{/snippet}
</ShowRotation>
