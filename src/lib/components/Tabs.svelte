<script lang="ts">
	import SlidingLine from "$lib/components/SlidingLine.svelte";
	import type { Snippet } from "svelte";

	type Props = {
		isBelowHeaderMobile?: boolean;
		isBelowHeaderDesktop?: boolean;
		padContent?: boolean;
		tabs: {
			title: string;
			content: Snippet;
		}[];
	};

	const {
		isBelowHeaderMobile = false,
		isBelowHeaderDesktop = false,
		padContent = false,
		tabs
	}: Props = $props();

	let activeTab = $state(0);
</script>

<div
	class="tabs-container"
	class:below-header--mobile={isBelowHeaderMobile}
	class:below-header--desktop={isBelowHeaderDesktop}
>
	<div class="tabs padded-top-bottom">
		<ul class="flex-row" role="tablist">
			{#each tabs as tab, i}
				<li role="tab" aria-selected={activeTab === i}>
					<button
						class="hoverable padded-top-bottom"
						onclick={() => void (activeTab = i)}
						type="button">{tab.title}</button
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

<div class:pad-content={padContent}>
	{@render tabs[activeTab].content()}
</div>

<style>
	.tabs-container {
		overflow-y: auto;
		position: sticky;
		top: 0;
		z-index: 500;
	}

	@media screen and (min-width: 1000px) {
		.below-header--desktop {
			top: calc(3.5rem + 4px);
		}
	}

	@media screen and (max-width: 999px) {
		.below-header--mobile {
			top: calc(3.5rem + 4px);
		}
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
			var(--background-color--opaque--transitionable),
			transparent
		);
		--background-color--opaque--transitionable: var(--background-color--opaque);
		transition: --background-color--opaque--transitionable 0.4s var(--cubic-bezier);
	}

	@property --background-color--opaque--transitionable {
		syntax: "<color>";
		initial-value: #ffffffe0;
		inherits: false;
	}

	.pad-content {
		padding: 0 1rem;
	}
</style>
