<script lang="ts">
	import type { Route } from "$lib/components/navbar/util";
	import IconLogo from "$lib/components/icons/IconLogo.svelte";
	import NavigationDrawer from "$lib/components/navbar/NavigationDrawer.svelte";
	import { basePath } from "../../../routes/[lang=lang]/[profile=profileId]/basePath.svelte";
	import { page } from "$app/state";

	type Props = {
		currentRoute: Route | null;
		diagramUrl?: string;
		journeyUrl?: string;
	};

	const { currentRoute, diagramUrl, journeyUrl }: Props = $props();
</script>

<div class="flex-row">
	<a class="hoverable flex-row" href={basePath(page)}>
		<IconLogo />
		Vahrplan
	</a>

	<NavigationDrawer {currentRoute} {diagramUrl} {journeyUrl} />
</div>

<style>
	a {
		gap: 1rem;
		align-items: center;
		text-decoration: none;
		font-weight: bold;
		padding: 0.5rem 1rem;
		margin-right: auto;
	}
</style>
