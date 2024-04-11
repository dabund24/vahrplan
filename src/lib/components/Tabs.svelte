<script lang="ts">
	import SlidingLine from "$lib/components/SlidingLine.svelte";

	export let tabs: string[] = [];

	let activeTab = 0;
</script>

<div class="tabs-container">
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
		<div class="desktop-line-container">
			<SlidingLine amountOfPositions={tabs.length} newPosition={activeTab} />
		</div>
	</div>
	<div class="transition"></div>
</div>

<slot {activeTab} />

<style>
	.tabs-container {
        overflow-y: auto;
        position: sticky;
        top: 0;
        z-index: 500;
    }
	.tabs {
        background-color: var(--background-color--opaque);
		backdrop-filter: var(--blur);
		-webkit-backdrop-filter: var(--blur);
        padding: 4px .5rem 0;
	}

	li {
		width: 100%;
	}

	button {
        width: 100%;
	}
</style>
