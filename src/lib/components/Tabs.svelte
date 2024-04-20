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
						on:click={() => void (activeTab = index)}
						type="button">{label}</button
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
		padding: 4px 0.5rem 0;
		transition: background 0.4s var(--cubic-bezier);
	}

	ul {
		align-items: baseline;
	}

	li {
		width: 100%;
	}

	button {
		width: 100%;
	}

	.transition {
		background: linear-gradient(
			to bottom,
			var(--background-color--opaque),
			transparent
		);
		transition: --background-color--opaque--transitionable 0.4s var(--cubic-bezier);
	}

	@property --background-color--opaque--transitionable {
		syntax: "<color>";
		initial-value: var(--background-color--opaque);
		inherits: false;
	}
</style>
