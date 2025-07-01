<script lang="ts">
	import MainForm from "./MainForm.svelte";
</script>

<svelte:head>
	<title>Vahrplan - Startseite</title>
	<meta name="title" content="Vahrplan" />
	<meta name="description" content="Reiseplanung mit Verbindungsdiagrammen" />
</svelte:head>

<h1 class="visually-hidden">Vahrplan: Reiseplanung mit Verbindungsdiagrammen</h1>

<section class="form">
	<h2 class="visually-hidden">Verbindungssuche</h2>
	<MainForm />
</section>

<style>
	.form {
		position: sticky;
		left: 0;
		z-index: 700;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	@media screen and (max-width: 999px) {
		.form {
			left: 0.75rem;
			max-width: calc(100vw - 1.5rem);
		}
	}
</style>
