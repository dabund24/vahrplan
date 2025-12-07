<script lang="ts">
	import ProfileSelection from "$lib/components/profiles/ProfileSelection.svelte";
</script>

<svelte:head>
	<title>Vahrplan - Datenquellen</title>
	<meta name="title" content="Vahrplan - Lesezeichen" />
	<meta name="description" content="Gemerkte Suchanfragen, Reisen und Stationen in Vahrplan" />
</svelte:head>

<div class="content-wrapper" data-sveltekit-preload-data="off">
	<h1>Datenquellen</h1>
	<ProfileSelection />
</div>
