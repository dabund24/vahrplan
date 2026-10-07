<script lang="ts">
	import Bookmarks from "$lib/components/bookmarks/Bookmarks.svelte";
	import { m } from "$lib/paraglide/messages";
</script>

<svelte:head>
	<title>Vahrplan - {m.bookmarks()}</title>
	<meta name="title" content="Vahrplan - {m.bookmarks()}" />
	<meta name="description" content="Gemerkte Suchanfragen, Reisen und Stationen in Vahrplan" />
</svelte:head>

<div class="content-wrapper" data-sveltekit-preload-data="off">
	<h1>{m.bookmarks()}</h1>
	<Bookmarks />
</div>
