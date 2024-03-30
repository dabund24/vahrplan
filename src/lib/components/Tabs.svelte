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
		<div class="line-container">
			<SlidingLine amountOfPositions={tabs.length} newPosition={activeTab} />
		</div>
	</div>
	<div class="transition"></div>
</div>

<slot {activeTab} />

<style>
	.tabs-container {
        overflow-y: scroll;
        position: sticky;
        top: 0;
        z-index: 500;
    }
	.tabs {
        background-color: var(--background-color--opaque);
        padding: 4px .5rem 0;
	}
	.transition {
        height: .5rem;
        width: 100%;
		background: linear-gradient(to bottom, var(--background-color--opaque), transparent);
	}
	li {
		width: 100%;
	}

	button {
        width: 100%;
	}
</style>
