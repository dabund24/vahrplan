<script lang="ts">
	import type { Route } from "$lib/components/navbar/util";
	import IconDrawer from "$lib/components/icons/IconDrawer.svelte";
	import MobileNavbarItem from "$lib/components/navbar/MobileNavbarItem.svelte";
	import IconLogo from "$lib/components/icons/IconLogo.svelte";
	import IconDetails from "$lib/components/icons/IconDetails.svelte";
	import IconSettings from "$lib/components/icons/IconSettings.svelte";
	import IconAbout from "$lib/components/icons/IconAbout.svelte";
	import IconBookmarkLarge from "$lib/components/icons/IconBookmarkLarge.svelte";
	import { beforeNavigate } from "$app/navigation";
	import IconJourneySelection from "$lib/components/icons/IconJourneySelection.svelte";
	import { page } from "$app/state";
	import { basePath } from "../../../routes/[lang=lang]/[profile=profileId]/basePath.svelte";
	import IconDataOrigin from "$lib/components/icons/IconDataOrigin.svelte";

	type Props = {
		currentRoute: Route | null;
		diagramUrl: string | undefined;
		journeyUrl: string | undefined;
	};

	const { currentRoute, diagramUrl, journeyUrl }: Props = $props();
</script>

<button popovertarget="navigation-drawer" class="hoverable">
	<IconDrawer />
</button>

<ul
	id="navigation-drawer"
	popover="auto"
	{@attach (el) => void beforeNavigate(() => void el.hidePopover())}
>
	<MobileNavbarItem
		{currentRoute}
		link={basePath(page)}
		route="/[lang=lang]/[profile=profileId]"
		pageName="Startseite"
	>
		{#snippet icon()}<IconLogo />{/snippet}
	</MobileNavbarItem>
	{#if diagramUrl !== undefined}
		<MobileNavbarItem
			{currentRoute}
			link={diagramUrl}
			route="/[lang=lang]/[profile=profileId]/diagram"
			pageName="Reiseauswahl"
		>
			{#snippet icon()}<IconJourneySelection />{/snippet}
		</MobileNavbarItem>
	{/if}
	{#if journeyUrl !== undefined}
		<MobileNavbarItem
			{currentRoute}
			link={journeyUrl}
			route="/[lang=lang]/[profile=profileId]/journey"
			pageName="Reisedetails"
		>
			{#snippet icon()}<IconDetails />{/snippet}
		</MobileNavbarItem>
	{/if}
	<hr />
	<MobileNavbarItem
		{currentRoute}
		link="/{page.data.lang}/profiles"
		route="/[lang=lang]/profiles"
		pageName="Datenquellen"
	>
		{#snippet icon()}<IconDataOrigin />{/snippet}
	</MobileNavbarItem>
	<MobileNavbarItem
		{currentRoute}
		link="/{page.data.lang}/bookmarks"
		route="/[lang=lang]/bookmarks"
		pageName="Lesezeichen"
	>
		{#snippet icon()}<IconBookmarkLarge />{/snippet}
	</MobileNavbarItem>
	<MobileNavbarItem
		{currentRoute}
		link="/{page.data.lang}/settings"
		route="/[lang=lang]/settings"
		pageName="Einstellungen"
	>
		{#snippet icon()}<IconSettings />{/snippet}
	</MobileNavbarItem>
	<MobileNavbarItem
		{currentRoute}
		link="/{page.data.lang}/about"
		route="/[lang=lang]/about"
		pageName="Über Vahrplan"
	>
		{#snippet icon()}<IconAbout />{/snippet}
	</MobileNavbarItem>
	<hr />
	<MobileNavbarItem
		{currentRoute}
		link="/{page.data.lang}/imprint"
		route="/[lang=lang]/imprint"
		pageName="Impressum"
	/>
	<MobileNavbarItem
		{currentRoute}
		link="/{page.data.lang}/privacy"
		route="/[lang=lang]/privacy"
		pageName="Datenschutz"
	/>
</ul>

<style>
	[popover] {
		border-radius: var(--border-radius--large);
		border: var(--border);
		background-color: var(--background-color);
		color: var(--foreground-color);
		padding: 0.5rem 0;
		scrollbar-width: thin;
		inset: calc(var(--navbar-space--top) + 0.5rem) 0.5rem auto auto;
	}
	[popover]:popover-open {
		display: flex;
		flex-direction: column;
		animation: zoom 0.2s var(--cubic-bezier--bounce);
	}

	/* TODO remove once desktop navbar is implemented */
	@media screen and (min-width: 1000px) {
		[popover] {
			top: calc(
				max(0.25rem, env(safe-area-inset-top)) + 1.25rem + 26px + 3 * var(--line-width)
			);
		}
	}
</style>
