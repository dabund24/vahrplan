<script lang="ts">
	import type { LineShape } from "$lib/server/journey-data/lineShapes";
	import { settings } from "$lib/state/settingStore";

	type Props = {
		lineName?: string;
		productName?: string;
		direction?: string;
		lineShape?: LineShape;
	};

	const { lineName, productName, direction, lineShape }: Props = $props();
</script>

<span class="container limit-lines">
	{#if lineShape !== undefined && $settings.general.isLineIcons}
		<b>
			{lineShape.linePrefix}
			<span
				class="shape shape--{lineShape.shape}"
				style:background-color={lineShape.backgroundColor}
				style:color={lineShape.textColor}
				style:border-color={lineShape.borderColor ?? lineShape.backgroundColor}
				>{lineShape.lineName}</span
			>
		</b>
	{:else}
		<b>{lineName ?? productName}</b>
	{/if}
	{#if direction !== undefined}
		→ {direction}
	{/if}
</span>

<style>
	.container {
		-webkit-line-clamp: 2;
		line-clamp: 2;
	}
	.shape {
		padding: 0 0.5rem;
		border-width: 0.125rem; /* 2px */
		border-style: solid;
		line-height: calc(1lh + 0.25rem);
	}

	.shape--pill,
	.shape--circle {
		border-radius: 50vh;
	}
	.shape--rectangle-rounded-corner {
		border-radius: 0.25lh;
	}
	.shape--hexagon {
		clip-path: polygon(50% -100%, 100% 50%, 50% 200%, 0 50%);
	}
	.shape--trapezoid {
		clip-path: polygon(100% 0, 50% 250%, 0 0);
	}
</style>
