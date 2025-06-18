<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		title: string | Snippet;
		children?: Snippet;
	};
	let { title, children }: Props = $props();
</script>

<header class="flex-row">
	<strong class="limit-lines">
		{#if typeof title === "string"}
			{title}
		{:else}
			{@render title()}
		{/if}
	</strong>
	<div class="buttons flex-row">
		{@render children?.()}
	</div>
</header>

<style>
	header {
		align-items: center;
		padding: 0.5rem 0.5rem 0.5rem 1rem;
		background-color: var(--background-color--transparent);
		border-bottom: var(--border);
		position: sticky;
		top: 0;
		z-index: 500;
		height: 2.5rem;
		gap: 0.5rem;
		transition:
			background-color 0.4s var(--cubic-bezier),
			border-bottom-color 0.4s var(--cubic-bezier);
		& > strong {
			-webkit-line-clamp: 2;
			line-clamp: 2;
		}
	}

	.buttons {
		margin-left: auto;
		align-items: center;
		gap: var(--line-width);
	}
</style>
