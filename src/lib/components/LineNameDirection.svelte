<script lang="ts">
	import { settings } from "$lib/state/settingStore";
	import type { LineShape } from "$lib/server/journey-data/line-shapes/LineShapeParser";
	import type { Product } from "$lib/types";

	type Props = {
		lineName?: string;
		productName?: string;
		product?: Product;
		direction?: string;
		lineShape?: LineShape;
	};

	const { lineName, productName, product, direction, lineShape }: Props = $props();

	function lineColorToCssColor(lineColor: LineShape["background"]): string | undefined {
		if (lineColor === undefined) {
			return undefined;
		}
		if (lineColor.type === "fixed") {
			return lineColor.value;
		}
		if (lineColor.type === "svg") {
			return `url(data:image/svg+xml,${lineColor.value}`;
		}
		if (
			lineColor.value === "background" ||
			lineColor.value === "foreground" ||
			lineColor.value === "product"
		) {
			return `var(--${lineColor.value}-color)`;
		}
		return `var(--accent-${lineColor.value})`;
	}
</script>

<span class="container limit-lines product--{product}">
	{#if lineShape !== undefined && $settings.general.isLineIcons}
		{@const background = lineColorToCssColor(lineShape.background)}
		{@const foregroundColor = lineColorToCssColor(lineShape.text)}
		{@const borderColor =
			lineShape.border === undefined ? "transparent" : lineColorToCssColor(lineShape.border)}
		<b>
			{lineShape.linePrefix}
			<span
				class="shape shape--{lineShape.shape}"
				style:background
				style:color={foregroundColor}
				style:border-color={borderColor}
				style:background-size="calc(100% + 0.25rem) calc(100% + 0.25rem)"
				style:background-position="-0.125rem -0.125rem"
			>
				{lineShape.lineName}
			</span>
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
