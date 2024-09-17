<script lang="ts">
	import type { ComponentProps, Snippet } from "svelte";
	import SingleSelect from "$lib/components/SingleSelect.svelte";

	type Props = {
		padContent?: boolean;
		tabs: {
			title: string; // for accessibility
			icon: Snippet; // the icon used
			content: Snippet; // the content associated with the tab
			isFullHeight?: boolean; // sets the height of the content to 100vh instead of 100%
		}[];
		tabEnvironment: Snippet<[Snippet, Snippet]>;
		startingTab?: number;
	};

	const { padContent = false, tabs, tabEnvironment, startingTab = 0 }: Props = $props();
	const tabsWithType: ComponentProps<SingleSelect<"icon">>["titles"] = tabs.map((tab) => ({
		title: tab.title,
		icon: tab.icon,
		type: "icon"
	}));

	let activeTab = $state(startingTab);
</script>

{#snippet miniTabs()}
	<SingleSelect titles={tabsWithType} bind:selected={activeTab} />
{/snippet}

{#snippet tabContent()}
	<div class:pad-content={padContent} class:full-height={tabs[activeTab].isFullHeight}>
		{@render tabs[activeTab].content()}
	</div>
{/snippet}

{@render tabEnvironment(miniTabs, tabContent)}

<style>
	.pad-content {
		padding: 0 1rem;
	}

	.full-height {
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;
	}

	@media (display-mode: browser) {
		.full-height {
			/* safari would start scrolling otherwise */
			height: -webkit-fill-available;
		}
	}
</style>
