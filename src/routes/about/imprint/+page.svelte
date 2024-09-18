<script lang="ts">
	import {
		PUBLIC_IMPRINT_TOWN,
		PUBLIC_IMPRINT_STREET,
		PUBLIC_IMPRINT_EMAIL_ADDRESS,
		PUBLIC_PHONE_NUMBER
	} from "$env/static/public";
	import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
	<title>Vahrplan - Impressum</title>
	<meta name="title" content="Vahrplan - Impressum" />
	<meta name="description" content="Das Impressum von Vahrplan" />
	<meta name="robots" content="noindex,follow" />
</svelte:head>

<Header title="Impressum" mobileOnly={true} />
<div class="content-wrapper">
	<h1 class="desktop-only">Impressum</h1>
	<p>
		Daniel Bund<br />
		{PUBLIC_IMPRINT_STREET}<br />
		{PUBLIC_IMPRINT_TOWN}
	</p>
	<p>
		Kontakt:<br />
		E-Mail: {PUBLIC_IMPRINT_EMAIL_ADDRESS}<br />
		Telefon: {PUBLIC_PHONE_NUMBER}
	</p>
</div>

<style>
	.content-wrapper {
		padding: 0.5rem 1rem;
	}
</style>
