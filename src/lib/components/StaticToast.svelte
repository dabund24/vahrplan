<script lang="ts">
	import type { Snippet } from "svelte";
	import { scale } from "svelte/transition";
	import IconClose from "$lib/components/icons/IconClose.svelte";

	type Props = {
		isVisible?: boolean;
		isCloseButtonHidden?: boolean;
		text: Snippet;
		buttons?: Snippet;
	};

	let {
		isVisible = $bindable(true),
		isCloseButtonHidden = false,
		text,
		buttons
	}: Props = $props();
</script>

{#if isVisible}
	<div transition:scale class="flex-row" role="status">
		<span> {@render text()} </span>
		<div class="flex-row">
			{#if buttons !== undefined}
				{@render buttons()}
			{/if}
			{#if !isCloseButtonHidden}
				<button
					class="hoverable hoverable--visible"
					onclick={() => void (isVisible = false)}
				>
					<IconClose />
				</button>
			{/if}
		</div>
	</div>
{/if}

<style>
	.flex-row {
		width: max-content;
		max-width: min(calc(100vw - 1.5rem), 30rem);
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
