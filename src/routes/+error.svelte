<script lang="ts">
	import { page } from '$app/stores';
</script>

<main>
	<h1>{$page.status}</h1>

	<p class="ta-center">{$page.error?.message}</p>
</main>
