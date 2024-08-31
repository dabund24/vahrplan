<script lang="ts">
	import type { ComponentProps, Snippet } from "svelte";
	import SingleSelect from "$lib/components/SingleSelect.svelte";

	type Props = {
		padContent?: boolean;
		tabs: {
			title: string; // for accessibility
			icon: Snippet; // the icon used
			content: Snippet; // the content associated with the tab
		}[];
		tabEnvironment: Snippet<[Snippet, Snippet]>;
	};

	const { padContent = false, tabs, tabEnvironment }: Props = $props();
	const tabsWithType: ComponentProps<SingleSelect<"icon">>["titles"] = tabs.map((tab) => ({
		title: tab.title,
		icon: tab.icon,
		type: "icon"
	}));

	let activeTab = $state(0);
</script>

{#snippet miniTabs()}
	<SingleSelect titles={tabsWithType} bind:selected={activeTab} />
{/snippet}

{#snippet tabContent()}
	<div class:pad-content={padContent}>
		{@render tabs[activeTab].content()}
	</div>
{/snippet}

{@render tabEnvironment(miniTabs, tabContent)}

<style>
	.pad-content {
		padding: 0 1rem;
	}
</style>
