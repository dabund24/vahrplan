<script lang="ts">
	import { page } from "$app/stores";
</script>

<div class="content-wrapper padded-top-bottom">
	<h1>Fehler {$page.status}</h1>
	<div class="line--regular line--accent"></div>
	<p>{$page.error?.message}</p>
</div>

<style>
	.line--accent {
		width: var(--line-length);
	}
</style>
