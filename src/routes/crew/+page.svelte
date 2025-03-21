<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { showData } = data;

	let currentTime = $state(new Date());

	const MAX_PROGRESS_TIME = 15; // in seconds
	let progress = $state(0);

	setInterval(() => {
		currentTime = new Date();

		progress += 0.01;
		if (progress > MAX_PROGRESS_TIME) {
			progress = 0;
		}
	}, 10); // 100 times per second
</script>

<h2>Crew</h2>

<ul class="dot-list">
	{#each showData.common.creativeTeam as role}
		<li class="dot-list__item">
			<span class="dot-list__label fw-strong"><span>{role.role}</span></span>
			<span class="dot-list__label"
				><span>{role.persons.map((str) => str.replaceAll(' ', ' ')).join(', ')}</span></span
			>
		</li>
	{/each}
</ul>

{#if showData.common.foh.length > 0}
	<h3>Technik (FoH)</h3>

	<ul class="dot-list">
		{#each showData.common.foh as role}
			<li class="dot-list__item">
				<span class="dot-list__label fw-strong"><span>{role.role}</span></span>
				<span class="dot-list__label"
					><span>{role.persons.map((str) => str.replaceAll(' ', ' ')).join(', ')}</span></span
				>
			</li>
		{/each}
	</ul>
{/if}

<p class="fs-xxs c-fg-3">
	{new Date(currentTime).toLocaleString('en-GB', {
		dateStyle: 'short',
		timeStyle: 'long'
	})} – Crew
</p>
