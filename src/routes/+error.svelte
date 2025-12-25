<script lang="ts">
	import { page } from "$app/state";
	import { resolve } from "$app/paths";
</script>

<div class="content-wrapper padded-top-bottom">
	<h1>Fehler {page.status}</h1>
	<p>{page.error?.message}</p>
	<div class="line--regular line--accent"></div>
	<p class="flex-row">
		<button onclick={() => void history.back()} class="hoverable hoverable--visible">
			Zurück
		</button>
		<a href={resolve("/")} class="hoverable hoverable--visible">Startseite</a>
	</p>
</div>

<style>
	.line--accent {
		width: var(--line-length);
	}

	.flex-row {
		gap: 1rem;
	}

	.hoverable {
		padding: 0.5rem 0.75rem;
		text-decoration: none;
	}
</style>
