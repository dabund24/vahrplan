<script lang="ts">
	import SlidingLine from "$lib/components/SlidingLine.svelte";
	import type { Snippet } from "svelte";

	type Props = {
		isAtTopOnMobile?: boolean;
		isBelowHeader?: boolean;
		tabs: {
			title: string;
			content: Snippet;
		}[];
	};

	const { isAtTopOnMobile = false, isBelowHeader = false, tabs }: Props = $props();

	let activeTab = $state(0);
</script>

<div
	class="tabs actions--mobile actions--desktop"
	class:always-top={isAtTopOnMobile}
	class:below-header={isBelowHeader}
>
	<ul
		class="flex-row hoverable--visible--group hoverable--visible--group--no-side-padding"
		role="tablist"
	>
		{#each tabs as tab, i (i)}
			<li role="tab" aria-selected={activeTab === i}>
				<button onclick={() => void (activeTab = i)} type="button">{tab.title}</button>
			</li>
		{/each}
	</ul>
	<div class="line-container">
		<SlidingLine amountOfPositions={tabs.length} newPosition={activeTab} />
	</div>
</div>

<div>
	{@render tabs[activeTab].content()}
</div>

<style>
	li {
		width: 100%;
	}

	button {
		width: 100%;
	}

	.line-container {
		position: relative;
		padding: 0 0.25rem;
	}

	@media screen and (max-width: 999px) {
		.always-top {
			position: sticky;
			top: 0;
			padding: 0.25rem 0;
			width: calc(100% + 1rem);
			margin: 0 -0.5rem 0.5rem;
		}
	}

	.below-header {
		top: calc(3.5rem + 4px);
	}
</style>
