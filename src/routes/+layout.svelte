<script lang="ts">
	import "./styles.css";
	import Navbar from "$lib/components/navbar/Navbar.svelte";
	import ProgressBar from "$lib/components/ProgressBar.svelte";
	import { afterNavigate, beforeNavigate } from "$app/navigation";
	import { startLoading, stopLoading } from "$lib/state/loadingStore";
	import Toasts from "$lib/components/Toasts.svelte";
	import { PUBLIC_ANALYTICS_SCRIPT } from "$env/static/public";
	import type { LayoutProps } from "./$types";
	import { page } from "$app/state";

	let { children, data }: LayoutProps = $props();

	beforeNavigate((navigation) => {
		if (navigation.to?.url.origin !== location.origin) {
			// ignore requests to other domains
			return;
		}
		const loadingId = startLoading(2);
		navigation.complete.then(
			() => stopLoading(loadingId, false),
			() => stopLoading(loadingId, true)
		);
	});

	afterNavigate((navigation) => {
		if (navigation.to?.url.href !== navigation.from?.url.href) {
			// @ts-expect-error plausible
			plausible("pageview", { u: `${location.origin}${page.route.id}` });
		}
	});
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html PUBLIC_ANALYTICS_SCRIPT}
	<script>
		window.plausible =
			window.plausible ||
			function () {
				(window.plausible.q = window.plausible.q || []).push(arguments);
			};
	</script>
</svelte:head>

<div class="app">
	<noscript>
		<dialog open>Leider ist Vahrplan nicht ohne Javascript nutzbar :/</dialog>
	</noscript>
	<ProgressBar />
	<Navbar />
	<main>
		{@render children()}
		<footer>
			<small>
				<a href="/de/privacy">Datenschutz</a>
				<a href="/de/imprint">Impressum</a>
			</small>
		</footer>
	</main>
	<Toasts news={data.news} />
</div>

<style>
	dialog {
		z-index: 1000;
	}
	.app {
		display: grid;
		grid-template-rows: auto 1fr;
		-webkit-overflow-scrolling: touch;
		min-height: 100vh;
	}

	small {
		position: fixed;
		z-index: 1000;
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
		main {
			margin-top: var(--navbar-space--top);
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
