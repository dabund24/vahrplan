<script>
	import Tabs from "$lib/components/Tabs.svelte";
	import Header from "$lib/components/Header.svelte";
	import DiagramBookmarks from "$lib/components/bookmarks/DiagramBookmarks.svelte";
	import JourneyBookmarks from "$lib/components/bookmarks/JourneyBookmarks.svelte";
</script>

<Header title="Favoriten" mobileOnly={true}></Header>
<div id="bookmarks">
	<Tabs let:activeTab tabs={["Diagramme", "Reisen", "Stationen"]}>
		<div class="tab-content">
			{#if activeTab === 0}
				<DiagramBookmarks />
			{:else if activeTab === 1}
				<JourneyBookmarks />
			{/if}
		</div>
	</Tabs>
</div>

<style>
	#bookmarks {
		max-width: 30rem;
		margin: auto;
	}

	.tab-content {
		padding: 0 1rem;
	}
</style>
