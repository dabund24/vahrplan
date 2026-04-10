<script lang="ts">
	import type { LegBlock } from "$lib/types";

	type Props = {
		legIconAnchorPrefix: string;
		highlightData: NonNullable<LegBlock["highlightData"]>;
	};

	const { legIconAnchorPrefix, highlightData }: Props = $props();
</script>

<div
	style:top="calc(anchor({legIconAnchorPrefix}{highlightData.beginIndex} center) - 0.5 * var(--height--icon--small))"
	style:left="anchor({legIconAnchorPrefix}{0} left)"
	style:bottom="calc(anchor({legIconAnchorPrefix}{highlightData.endIndex} center) - 0.5 * var(--height--icon--small))"
>
</div>

<style>
	div {
		position: absolute;
        width: var(--height--icon--small);
		background-color: var(--product-color);
		border-radius: 50vh;
	}
</style>
