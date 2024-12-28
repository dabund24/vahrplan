<script lang="ts">
	import SlidingLine from "$lib/components/SlidingLine.svelte";
	import type { Snippet } from "svelte";
	import TitlelessHeader from "$lib/components/TitlelessHeader.svelte";

	type Props = {
		isBelowHeaderMobile?: boolean;
		isBelowHeaderDesktop?: boolean;
		padContent?: boolean;
		tabs: {
			title: string;
			content: Snippet;
		}[];
	};

	const { isBelowHeaderMobile = false, isBelowHeaderDesktop = false, tabs }: Props = $props();

	let activeTab = $state(0);
</script>

<TitlelessHeader {isBelowHeaderMobile} {isBelowHeaderDesktop}>
	<div class="tabs padded-top-bottom">
		<ul
			class="flex-row hoverable--visible--group hoverable--visible--group--no-side-padding"
			role="tablist"
		>
			{#each tabs as tab, i}
				<li role="tab" aria-selected={activeTab === i}>
					<button onclick={() => void (activeTab = i)} type="button">{tab.title}</button>
				</li>
			{/each}
		</ul>
		<div class="line-container">
			<SlidingLine amountOfPositions={tabs.length} newPosition={activeTab} />
		</div>
	</div>
</TitlelessHeader>

<div>
	{@render tabs[activeTab].content()}
</div>

<style>
	.tabs {
		padding: 4px 0.5rem 0;
	}

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
</style>
