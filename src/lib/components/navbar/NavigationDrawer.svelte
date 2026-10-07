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
	import { basePath } from "../../../routes/[profile=profileId]/basePath.svelte";
	import IconDataOrigin from "$lib/components/icons/IconDataOrigin.svelte";
	import IconTrip from "$lib/components/icons/IconTrip.svelte";
	import { browser } from "$app/environment";
	import { m } from "$lib/paraglide/messages";

	type Props = {
		currentRoute: Route | null;
		diagramUrl: string | undefined;
		journeyUrl: string | undefined;
	};

	const { currentRoute, diagramUrl, journeyUrl }: Props = $props();
</script>

<button
	popovertarget="navigation-drawer"
	aria-label={m.navigation()}
	title={m.navigation()}
	class="hoverable"
>
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
		route="/[profile=profileId]"
		pageName={m.home()}
	>
		{#snippet icon()}<IconLogo />{/snippet}
	</MobileNavbarItem>
	{#if diagramUrl !== undefined}
		<MobileNavbarItem
			{currentRoute}
			link={diagramUrl}
			route="/[profile=profileId]/diagram"
			pageName={m.diagram()}
		>
			{#snippet icon()}<IconJourneySelection />{/snippet}
		</MobileNavbarItem>
	{/if}
	{#if journeyUrl !== undefined}
		<MobileNavbarItem
			{currentRoute}
			link={journeyUrl}
			route="/[profile=profileId]/journey"
			pageName={m.journey()}
		>
			{#snippet icon()}<IconDetails />{/snippet}
		</MobileNavbarItem>
	{/if}
	{#if currentRoute === "/[profile=profileId]/trip/[tripId]"}
		<MobileNavbarItem
			{currentRoute}
			link={browser ? location.href : "/"}
			route="/[profile=profileId]/trip/[tripId]"
			pageName={m.trip()}
		>
			{#snippet icon()}<IconTrip />{/snippet}
		</MobileNavbarItem>
	{/if}
	<hr />
	<MobileNavbarItem
		{currentRoute}
		link="/{page.data.lang}/profiles"
		route="/profiles"
		pageName={m.profiles()}
	>
		{#snippet icon()}<IconDataOrigin />{/snippet}
	</MobileNavbarItem>
	<MobileNavbarItem
		{currentRoute}
		link="/{page.data.lang}/bookmarks"
		route="/bookmarks"
		pageName={m.bookmarks()}
	>
		{#snippet icon()}<IconBookmarkLarge />{/snippet}
	</MobileNavbarItem>
	<MobileNavbarItem
		{currentRoute}
		link="/{page.data.lang}/settings"
		route="/settings"
		pageName={m.settings()}
	>
		{#snippet icon()}<IconSettings />{/snippet}
	</MobileNavbarItem>
	<MobileNavbarItem
		{currentRoute}
		link="/{page.data.lang}/about"
		route="/about"
		pageName={m.about()}
	>
		{#snippet icon()}<IconAbout />{/snippet}
	</MobileNavbarItem>
	<hr />
	<MobileNavbarItem
		{currentRoute}
		link="/{page.data.lang}/imprint"
		route="/imprint"
		pageName={m.imprint()}
	/>
	<MobileNavbarItem
		{currentRoute}
		link="/{page.data.lang}/privacy"
		route="/privacy"
		pageName={m.privacy()}
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
