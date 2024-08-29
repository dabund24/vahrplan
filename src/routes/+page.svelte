<script lang="ts">
	import MainForm from "./MainForm.svelte";
</script>

<svelte:head>
	<title>Start</title>
	<meta name="description" content="Verbindungszusammenstellung für Fortgeschrittene" />
</svelte:head>

<section class="form">
	<MainForm />
</section>

<style>
	.form {
		position: sticky;
		left: 0;
		z-index: 100;
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
