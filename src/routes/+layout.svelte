<script lang="ts">
	import "./styles.css";
	import Navbar from "./Navbar.svelte";
	import ProgressBar from "$lib/components/ProgressBar.svelte";
	import { beforeNavigate } from "$app/navigation";
	import { startLoading, stopLoading } from "$lib/stores/loadingStore";
	import Toasts from "$lib/components/Toasts.svelte";
	import type { Snippet } from "svelte";

	type Props = { children: Snippet };

	let { children }: Props = $props();

	beforeNavigate((navigation) => {
		if (navigation.to?.url.origin !== location.origin) {
			// ignore requests to other domains
			return;
		}
		const loadingID = startLoading(2);
		navigation.complete.then(
			() => stopLoading(loadingID, false),
			() => stopLoading(loadingID, true)
		);
	});
</script>

<div class="app">
	<ProgressBar />
	<Navbar />
	<main>
		{@render children()}
		<footer>
			<small>
				<a href="about/privacy">Datenschutz</a>
				<a href="about/imprint">Impressum</a>
			</small>
		</footer>
	</main>
	<Toasts />
</div>

<style>
	.app {
		display: grid;
		grid-template-rows: auto 1fr;
		-webkit-overflow-scrolling: touch;
		min-height: 100vh;
	}

	small {
		position: fixed;
		left: 0;
		bottom: 0;
		font-size: 0.75rem;
		background-color: var(--background-color--transparent);
		padding: 0 5px;
		line-height: 1.4;
		transition:
			background-color 0.4s var(--cubic-bezier),
			color 0.4s var(--cubic-bezier);
	}

	@media (display-mode: browser) {
		.app {
			min-height: unset;
		}
	}
	main {
		width: 100vw;
		margin: 0 auto;
		box-sizing: border-box;
		overflow-y: auto;
		padding-bottom: var(--navbar-space--bottom);
	}

	@media screen and (max-width: 999px) {
		.app {
			grid-template-rows: 100% auto;
		}

		main {
			overflow: unset;
		}

		small {
			display: none;
		}
	}

	@media screen and (min-width: 1000px) {
		.app {
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
		}
	}

	@media screen and (min-width: 1000px) and (display-mode: browser) {
		.app {
			position: fixed;
			height: 100vh;
			height: -webkit-fill-available;
		}
	}
</style>
