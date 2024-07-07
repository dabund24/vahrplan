<script lang="ts">
	import MainForm from "./MainForm.svelte";
</script>

<svelte:head>
	<title>Start</title>
	<meta name="description" content="Verbindungszusammenstellung für Fortgeschrittene" />
</svelte:head>

<div class="split-container">
	<section class="form padded-top-bottom">
		<MainForm isLandingPage={true}/>
	</section>
</div>

<style>
	.form {
		position: sticky;
		left: 0.75rem;
		z-index: 100;
        max-width: calc(100vw - 1.5rem);
    }

	.split-container {
		height: 100%;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	@media screen and (min-width: 1000px) {
		.form {
			left: 0;
            max-width: unset;
        }
	}
</style>
