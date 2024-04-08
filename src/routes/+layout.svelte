<script>
	import './styles.css';
	import Navbar from "./Navbar.svelte";
</script>

<div class="app">
	<Navbar />
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: grid;
		grid-template-rows: auto 1fr;
        -webkit-overflow-scrolling: touch;
	}
	main {
        width: 100vw;
		margin: 0 auto;
		box-sizing: border-box;
		overflow-y: hidden;
	}

	@media screen and (max-width: 999px) {
		.app {
            grid-template-rows: 100% auto;
		}

		main {
			padding-bottom: calc(1.5rem + max(.5rem, env(safe-area-inset-bottom)) + 38px);
			overflow: unset;
		}
    }

    @media screen and (min-width: 1000px) {
		.app {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
		}
    }
</style>
