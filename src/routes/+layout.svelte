<script>
	import './styles.css';
	import Navbar from './Navbar.svelte';
</script>

<div class="app">
	<main>
		<slot />
	</main>
	<Navbar />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
        width: 100vw;
		margin: 0 auto;
		box-sizing: border-box;
	}
/*
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}
 */
</style>
