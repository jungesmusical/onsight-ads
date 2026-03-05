<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const showData = $derived(data.showData);
	const numItem = $derived(data.numItem);
</script>

<header>
	<h1>Werbung tbd.</h1>
</header>


<style lang="scss">

</style>
