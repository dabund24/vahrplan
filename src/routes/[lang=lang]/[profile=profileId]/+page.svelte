<script lang="ts">
	import MainForm from "./MainForm.svelte";
	import Bookmarks from "$lib/components/bookmarks/Bookmarks.svelte";
	import ProfileSelector from "./ProfileSelector.svelte";
</script>

<svelte:head>
	<title>Vahrplan - Startseite</title>
	<meta name="title" content="Vahrplan" />
	<meta name="description" content="Reiseplanung mit Verbindungsdiagrammen" />
</svelte:head>

<h1 class="visually-hidden">Vahrplan: Reiseplanung mit Verbindungsdiagrammen</h1>

<section class="form">
	<h2 class="visually-hidden">Verbindungssuche</h2>
	<ProfileSelector />
	<MainForm />
</section>
<section class="bookmarks content-wrapper" data-sveltekit-preload-data="off">
	<hr />
	<h2>Lesezeichen</h2>
	<Bookmarks />
</section>

<style>
	.form {
		position: sticky;
		left: 0;
		z-index: 700;
		margin-bottom: 1rem;
	}

	@media screen and (max-width: 999px) {
		.form {
			left: 0.75rem;
			max-width: calc(100vw - 1.5rem);
		}
	}
</style>
