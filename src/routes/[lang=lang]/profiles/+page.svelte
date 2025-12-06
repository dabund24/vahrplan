<script lang="ts">
	import type { PageProps } from "./$types";
	import ProfileLink from "./ProfileLink.svelte";

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Vahrplan - Datenquellen</title>
	<meta name="title" content="Vahrplan - Lesezeichen" />
	<meta name="description" content="Gemerkte Suchanfragen, Reisen und Stationen in Vahrplan" />
</svelte:head>

<div class="content-wrapper" data-sveltekit-preload-data="off">
	<h1>Datenquellen</h1>
	<p>
		Wähle hier aus, woher die Verbindungsdaten kommen sollen. Eine regionalere Quelle bedeutet
		in der Regel eine bessere Datenqualität.
	</p>

	{#each data.profiles as profileConfig (profileConfig.id)}
		<ProfileLink {profileConfig} />
	{/each}
</div>
