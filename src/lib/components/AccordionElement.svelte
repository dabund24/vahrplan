<script lang="ts">
	import type { Snippet } from "svelte";
	import IconExpand from "$lib/components/icons/IconExpand.svelte";

	type Props = {
		title: string;
		children: Snippet;
	};

	let { title, children }: Props = $props();
</script>

<details>
	<summary class="flex-row hoverable hoverable--visible">
		{title}
		<IconExpand />
	</summary>
	{@render children()}
</details>

<style>
	details {
		padding: 0.25rem 0;
	}
	details[open] summary > :global(svg) {
		transform: scaleY(-1);
	}
	summary {
		justify-content: space-between;
		align-items: center;
		margin: 0 -0.5rem 0.5rem;
		padding: 0.5rem 0.75rem;
	}
</style>
