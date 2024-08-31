<script lang="ts">
	import IconInfo from "$lib/components/icons/IconInfo.svelte";
	import type { Snippet } from "svelte";

	type Props = { color?: string; children: Snippet };

	let { color, children }: Props = $props();
</script>

<div class="padded-top-bottom text--{color} flex-row">
	<IconInfo {color} />
	<span>
		{@render children()}
	</span>
</div>

<style>
	.flex-row {
		align-items: center;
		gap: 0.5rem;
        width: 100%;
		& > :global(:first-child) {
			flex-shrink: 0;
		}
	}
</style>
