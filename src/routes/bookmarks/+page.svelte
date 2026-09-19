<script lang="ts">
	import Bookmarks from "$lib/components/bookmarks/Bookmarks.svelte";
</script>

<svelte:head>
	<title>Vahrplan - Lesezeichen</title>
	<meta name="title" content="Vahrplan - Lesezeichen" />
	<meta name="description" content="Gemerkte Suchanfragen, Reisen und Stationen in Vahrplan" />
</svelte:head>

<div class="content-wrapper" data-sveltekit-preload-data="off">
	<h1>Lesezeichen</h1>
	<Bookmarks />
</div>
