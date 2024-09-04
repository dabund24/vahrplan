<script>
import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
	<title>Vahrplan - Über</title>
	<meta name="title" content="Vahrplan - Über" />
	<meta name="description" content="Weiterführende Informationen über Vahrplan" />
</svelte:head>

<Header title={"Über diese Seite"} mobileOnly={true} />
<div class="content-wrapper">
	Daniel Bund, 2023 - 2024
</div>

<style>
	.content-wrapper {
        padding: 1rem;
	}
</style>