<script lang="ts">
	import {page} from "$app/stores";
</script>

<div class="content-wrapper">
	<h1>Fehler {$page.status} :(</h1>
	<p>{$page.error?.message}</p>
</div>
