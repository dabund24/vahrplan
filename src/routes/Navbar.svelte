<script lang="ts">
	import { page } from "$app/stores";
	import IconLogo from "$lib/components/icons/IconLogo.svelte";
	import IconSettings from "$lib/components/icons/IconSettings.svelte";
	import IconAbout from "$lib/components/icons/IconAbout.svelte";
	import SlidingLine from "$lib/components/SlidingLine.svelte";
	import IconDetails from "$lib/components/icons/IconDetails.svelte";
	import { browser } from "$app/environment";
	import IconBookmarkLarge from "$lib/components/icons/IconBookmarkLarge.svelte";
	import { getDisplayedFormData } from "$lib/state/displayedFormData.svelte.js";
	import { getSelectedData } from "$lib/state/selectedData.svelte";
	import { apiClient } from "$lib/api-client/apiClientFactory";
	import { getDisplayedJourney } from "$lib/state/displayedJourney.svelte";

	const displayedFormData = $derived(getDisplayedFormData());
	const selectedData = $derived(getSelectedData());
	const displayedJourney = $derived(getDisplayedJourney());

	const diagramApiClient = apiClient("GET", "/api/diagram");
	const journeyApiClient = apiClient("GET", "/api/journey");

	let currentPage = $derived(getCurrentPageIndex($page.url.pathname));

	function getCurrentPageIndex(pathname: string): number {
		if (pathname === "/" || pathname.startsWith("/diagram")) return 0;
		if (pathname.startsWith("/journey")) return 1;
		if (pathname.startsWith("/bookmarks")) return 2;
		if (pathname === "/settings") return 3;
		else return 4;
	}

	let diagramUrl = $derived.by(() => {
		if (browser && displayedFormData !== undefined) {
			const reqData = diagramApiClient.formDataToRequestData(displayedFormData);
			return diagramApiClient.formatNonApiUrl(reqData).href;
		}
		return "/";
	});

	let journeyUrl = $derived.by(() => {
		if (browser && selectedData.isFullJourneySelected) {
			const tokens = displayedJourney.selectedSubJourneys.map((j) => j?.refreshToken ?? "");
			return journeyApiClient.formatNonApiUrl(tokens).href;
		}
		return "/journey";
	});
</script>

<nav>
	<div class="links-container">
		<ul>
			<li aria-current={currentPage === 0 ? "page" : undefined}>
				<a href={diagramUrl} class="hoverable flex-row">
					<IconLogo />
					<span
						>{browser && displayedFormData !== undefined
							? "Diagramm"
							: "Startseite"}</span
					>
				</a>
			</li>
			<li aria-current={currentPage === 1 ? "page" : undefined}>
				<a href={journeyUrl} class="hoverable flex-row">
					<IconDetails />
					<span>Reisedetails</span>
				</a>
			</li>
			<li aria-current={currentPage === 2 ? "page" : undefined}>
				<a href="/bookmarks" class="hoverable flex-row">
					<IconBookmarkLarge />
					<span>Lesezeichen</span>
				</a>
			</li>
			<li aria-current={currentPage === 3 ? "page" : undefined}>
				<a href="/settings" class="hoverable flex-row">
					<IconSettings />
					<span>Einstellungen</span>
				</a>
			</li>
			<li aria-current={currentPage === 4 ? "page" : undefined}>
				<a href="/about" class="hoverable flex-row">
					<IconAbout />
					<span>Über Vahrplan</span>
				</a>
			</li>
		</ul>
		<div class="line-container">
			<SlidingLine amountOfPositions={5} newPosition={currentPage} />
		</div>
	</div>
</nav>

<style>
	nav {
		border-bottom: var(--border);
		padding: max(0.5rem, env(safe-area-inset-top) + 0.2rem) 0.5rem 0.5rem;
		transition:
			background-color 0.4s var(--cubic-bezier),
			border-color 0.4s var(--cubic-bezier);
	}
	.links-container {
		width: fit-content;
		margin: auto;
	}
	ul {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
	}
	a {
		text-decoration: none;
		width: 100%;
		text-align: center;
		padding: 0.5rem 1rem;
		box-sizing: border-box;
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}
	.line-container {
		position: relative;
	}

	@media screen and (min-width: 1000px) {
		.line-container {
			translate: calc(100% / -10 + var(--line-width) + 1.25rem + 0.8125rem);
		}
		li {
			margin: 0 0.25rem;
		}
	}

	@media screen and (max-width: 999px) {
		nav {
			order: 1;
			border-bottom: none;
			border-top: var(--border);
			padding: 0.5rem 0.5rem max(0.5rem, env(safe-area-inset-bottom) + 0.2rem);
			text-align: center;
			position: fixed;
			bottom: 0;
			width: 100vw;
			box-sizing: border-box;
			z-index: 700;
			background-color: var(--background-color--transparent);
		}
		.links-container {
			width: 100%;
		}
		a {
			padding: 0.5rem 0;
		}
		a > :global(svg) {
			margin: auto;
		}
		a > span {
			display: none;
		}
	}
</style>
