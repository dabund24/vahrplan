<script lang="ts">
	import { scrollDiagramData } from "$lib/state/diagramData.svelte.js";
	import type { RelativeTimeType } from "$lib/types";
	import IconUpArrow from "$lib/components/icons/IconUpArrow.svelte";
	import IconDownArrow from "$lib/components/icons/IconDownArrow.svelte";
	import { toast } from "$lib/state/toastStore";

	type Props = {
		isClickable: boolean;
		isTextHidden?: boolean;
		scrollDirection: RelativeTimeType;
	};

	const { isClickable, scrollDirection, isTextHidden }: Props = $props();

	const buttonText = $derived(scrollDirection === "earlier" ? "Früher" : "Später");

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
		{#if !isTextHidden}
			{buttonText}
		{/if}
	</button>
</div>

<style>
	div {
		width: 100%;
		position: relative;
		padding: 0.5rem 0;
	}
	button {
		position: sticky;
		left: 0.5rem;
		gap: 0.5rem;
		align-items: center;
		background-image: linear-gradient(
			var(--foreground-color--very-transparent),
			var(--foreground-color--very-transparent)
		);
		background-color: var(--background-color);
		box-shadow: var(--background-color) 0 0 var(--line-width) var(--line-width);
	}
	.not-scrollable {
		opacity: 0.5;
	}
</style>
