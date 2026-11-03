<script lang="ts">
	import type { Production, Role } from './Production';
	import { joinNames } from './joinNames';
	import { personNames } from './personNames';

	const {
		roles,
		people,
		markWalkIn = false
	}: {
		roles: (Role & { walkInCover?: boolean })[];
		people: Production['people'];
		/** Hängt ein `*` an die Namen von Rollen, die ein Walk-in-Cover spielt. */
		markWalkIn?: boolean;
	} = $props();
</script>

<dl class="credits">
	{#each roles as role}
		<dt class="fw-strong">{role.roleName}</dt>
		<dd class="no-hyphens">
			{joinNames(
				personNames(role.members, people).map((name) =>
					markWalkIn && role.walkInCover ? name + '*' : name
				),
				{ withAnd: false }
			)}
		</dd>
	{/each}
</dl>

<style>
	.credits {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--xxs) 1rem;
		align-items: start;
	}

	dt {
		text-align: end;
		text-wrap: balance;
	}

	dd {
		margin: 0;
		text-wrap: balance;
	}
</style>
