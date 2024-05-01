<script lang="ts">
	import { page } from "$app/stores";
	import IconLogo from "$lib/components/icons/IconLogo.svelte";
	import IconMap from "$lib/components/icons/IconMap.svelte";
	import IconSettings from "$lib/components/icons/IconSettings.svelte";
	import IconAbout from "$lib/components/icons/IconAbout.svelte";
	import SlidingLine from "$lib/components/SlidingLine.svelte";
	import IconDetails from "$lib/components/icons/IconDetails.svelte";

	$: [currentPageMobile, currentPageDesktop] = getCurrentPageIndex($page.url.pathname);

	function getCurrentPageIndex(pathname: string): [number, number] {
		if (pathname === "/") return [0, 0];
		if (pathname.startsWith("/journey")) return [1, 1];
		if (pathname.startsWith("/map")) return [2, 1];
		if (pathname === "/settings") return [3, 2];
		else return [4, 3];
	}
</script>

<nav>
	<div class="links-container">
		<ul>
			<li aria-current={currentPageMobile === 0 ? "page" : undefined}>
				<a href="/" class="hoverable flex-row">
					<IconLogo />
					<span>Verbindungssuche</span>
				</a>
			</li>
			<li aria-current={currentPageMobile === 1 ? "page" : undefined}>
				<a href="/journey" class="hoverable flex-row journey-link">
					<IconMap />
					<IconDetails />
					<span>Details/Karte</span>
				</a>
			</li>
			<li aria-current={currentPageMobile === 2 ? "page" : undefined}>
				<a href="/map" class="hoverable flex-row">
					<IconMap />
				</a>
			</li>
			<li aria-current={currentPageMobile === 3 ? "page" : undefined}>
				<a href="/settings" class="hoverable flex-row">
					<IconSettings />
					<span>Einstellungen</span>
				</a>
			</li>
			<li aria-current={currentPageMobile === 4 ? "page" : undefined}>
				<a href="/about" class="hoverable flex-row">
					<IconAbout />
					<span>Über</span>
				</a>
			</li>
		</ul>
		<div class="mobile-line-container">
			<SlidingLine amountOfPositions={5} newPosition={currentPageMobile} />
		</div>
		<div class="desktop-line-container">
			<SlidingLine amountOfPositions={4} newPosition={currentPageDesktop} />
		</div>
	</div>
</nav>

<style>
	nav {
		border-bottom: var(--border);
		padding: max(0.5rem, env(safe-area-inset-top)) 0.5rem 0.5rem;
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

	@media screen and (min-width: 1000px) {
		li:nth-child(3) {
			display: none;
		}
		.desktop-line-container {
			translate: calc(100% / -8 + var(--line-width) + 1rem + 13px);
		}
		.mobile-line-container {
			display: none;
		}
		.journey-link > :global(:nth-child(2)) {
            display: none;
		}
	}

	@media screen and (max-width: 999px) {
		nav {
			order: 1;
			border-bottom: none;
			border-top: var(--border);
			padding: 0.5rem 0.5rem max(0.5rem, env(safe-area-inset-bottom));
			text-align: center;
			position: fixed;
			bottom: 0;
			width: 100vw;
			box-sizing: border-box;
			z-index: 550;
			background-color: var(--background-color--opaque);
			backdrop-filter: var(--blur);
			-webkit-backdrop-filter: var(--blur);
			transition:
				background-color 0.4s var(--cubic-bezier),
				border-color 0.4s var(--cubic-bezier);
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
		.desktop-line-container {
			display: none;
		}
        .journey-link > :global(:first-child) {
            display: none;
        }
	}
</style>
