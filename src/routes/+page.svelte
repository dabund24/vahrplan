<script lang="ts">
	import MainForm from "./MainForm.svelte";
</script>

<svelte:head>
	<title>Vahrplan - Startseite</title>
	<meta name="title" content="Vahrplan" />
	<meta name="description" content="Reiseplanung mit Verbindungsdiagrammen" />
</svelte:head>

<section class="form">
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
