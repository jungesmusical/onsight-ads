<script lang="ts">
	import type { PageData } from './$types';
	import { personNames } from '$lib/personNames';

	const { data } = $props<{ data: PageData }>();
	const showData = $derived(data.showData);
</script>

<h2>Crew</h2>

<ul class="dot-list">
	{#each showData.creativeTeam as role}
		<li class="dot-list__item">
			<span class="dot-list__label fw-strong"><span>{role.roleName}</span></span>
			<span class="dot-list__label no-hyphens"
				><span
					>{personNames(role.members, showData.people)
						.map((str) => str.replaceAll(' ', ' '))
						.join(', ')}</span
				></span
			>
		</li>
	{/each}
</ul>

{#if showData.foh.length > 0}
	<h3>Technik (FoH)</h3>

	<ul class="dot-list">
		{#each showData.foh as role}
			<li class="dot-list__item">
				<span class="dot-list__label fw-strong"><span>{role.roleName}</span></span>
				<span class="dot-list__label no-hyphens"
					><span
						>{personNames(role.members, showData.people)
							.map((str) => str.replaceAll(' ', ' '))
							.join(', ')}</span
					></span
				>
			</li>
		{/each}
	</ul>
{/if}
