<script>
import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
	<title>Über</title>
	<meta name="description" content="Über diese Seite" />
</svelte:head>

<Header title={"Über diese Seite"} mobileOnly={true} />
<div id="about">
	Daniel Bund, 2023 - 2024
</div>

<style>
	#about {
		max-width: 30rem;
        margin: auto;
        padding: 1rem;
	}
</style>