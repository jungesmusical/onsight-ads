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

<ul class="dot-list">
	{#each roles as role}
		<li class="dot-list__item">
			<span class="dot-list__label fw-strong"><span>{role.roleName}</span></span>
			<span class="dot-list__label no-hyphens"
				><span
					>{joinNames(
						personNames(role.members, people).map((name) =>
							markWalkIn && role.walkInCover ? name + '*' : name
						),
						{ withAnd: false }
					)}</span
				></span
			>
		</li>
	{/each}
</ul>
