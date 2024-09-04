<script lang="ts">
	import "./styles.css";
	import Navbar from "./Navbar.svelte";
	import { settings } from "$lib/stores/settingStore";
	import ProgressBar from "$lib/components/ProgressBar.svelte";
	import { beforeNavigate } from "$app/navigation";
	import { startLoading, stopLoading } from "$lib/stores/loadingStore";
	import Toasts from "$lib/components/Toasts.svelte";
	import type { Snippet } from "svelte";

	type Props = { children: Snippet };

	let { children }: Props = $props();

	beforeNavigate((navigation) => {
		const loadingID = startLoading(2);
		navigation.complete.then(
			() => stopLoading(loadingID, false),
			() => stopLoading(loadingID, true)
		);
	});
</script>

<div class="app" data-blur={$settings.view.general.blur ? "true" : ""}>
	<ProgressBar />
	<Navbar />
	<main>
		{@render children()}
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
		}
	}
</style>
