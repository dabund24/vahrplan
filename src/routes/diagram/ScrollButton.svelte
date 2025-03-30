<script lang="ts">
	import { scrollDiagramData } from "$lib/state/diagramData.svelte";
	import type { RelativeTimeType } from "$lib/types";
	import IconUpArrow from "$lib/components/icons/IconUpArrow.svelte";
	import IconDownArrow from "$lib/components/icons/IconDownArrow.svelte";
	import { toast } from "$lib/state/toastStore";

	type Props = {
		isClickable: boolean;
		scrollDirection: RelativeTimeType;
	};

	const { isClickable, scrollDirection }: Props = $props();

	const buttonText = scrollDirection === "earlier" ? "Früher" : "Später";

	function scroll(): void {
		if (!isClickable) {
			toast("Suche nach mehr Verbindungen nicht möglich.", "red");
			return;
		}
		void scrollDiagramData(scrollDirection);
	}
</script>

<div>
	<button
		class="hoverable hoverable--visible flex-row"
		class:not-scrollable={!isClickable}
		onclick={scroll}
	>
		{#if scrollDirection === "earlier"}
			<IconUpArrow />
		{:else}
			<IconDownArrow />
		{/if}
		{buttonText}
	</button>
</div>

<style>
	div {
		width: 100%;
		position: relative;
	}
	button {
		position: sticky;
		left: 0.5rem;
		gap: 0.5rem;
		align-items: center;
	}
	.not-scrollable {
		opacity: 0.5;
	}
</style>
