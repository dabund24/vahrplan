<script lang="ts">
	import MainForm from "./MainForm.svelte";
	import Bookmarks from "$lib/components/bookmarks/Bookmarks.svelte";
	import ProfileChips from "$lib/components/profiles/ProfileChips.svelte";
	import { m } from "$lib/paraglide/messages";
</script>

<svelte:head>
	<title>Vahrplan - {m.home()}</title>
	<meta name="title" content="Vahrplan" />
	<meta name="description" content={m.subtitle()} />
</svelte:head>

<h1 class="visually-hidden">Vahrplan: {m.subtitle}</h1>

<section class="form">
	<h2 class="visually-hidden">{m.journey_search()}</h2>
	<ProfileChips />
	<MainForm />
</section>
<section class="bookmarks content-wrapper" data-sveltekit-preload-data="off">
	<hr />
	<h2>{m.bookmarks()}</h2>
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
