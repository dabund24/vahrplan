<script lang="ts">
	import SlidingLine from "$lib/components/SlidingLine.svelte";

	export let tabs: string[] = [];

	let activeTab = 0;
</script>

<div class="tabs padded-top-bottom">
	<ul class="flex-row" role="tablist">
		{#each tabs as label, index}
			<li role="tab" aria-selected={activeTab === index}>
				<button
					class="hoverable padded-top-bottom"
					on:click={() => void (activeTab = index)} type="button">{label}</button
				>
			</li>
		{/each}
	</ul>
	<div class="line-container">
		<SlidingLine amountOfPositions={tabs.length} newPosition={activeTab} />
	</div>
</div>

<slot {activeTab} />

<style>
	.tabs {
        overflow-y: scroll;
        position: sticky;
        top: 0;
        background-color: var(--background-color--opaque);
        z-index: 500;
        padding: 0 .5rem;
    }
	li {
		width: 100%;
	}

	button {
        width: 100%;
	}
</style>
