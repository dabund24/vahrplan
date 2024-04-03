<script lang="ts">
	import { L } from "$lib/stores";
	import { getContext, onDestroy, onMount } from "svelte";
	import type { PopupData } from "$lib/types";
	import Time from "$lib/components/journeys/Time.svelte";
	import NameDelayPlatform from "$lib/components/journeys/NameDelayPlatform.svelte";
	import "./popup.css";
	import IconFiller from "$lib/components/journeys/IconFiller.svelte";

	export let popupData: PopupData;
	let popup: L.Popup | undefined;
	let popupElement: HTMLElement;

	// let open = false;

	const { getLayer }: { getLayer: () => L.Layer | undefined } = getContext("layer");
	const layer = getLayer();

	onMount(() => {
		popup = $L.popup({ className: "map__popup", closeButton: false }).setContent(popupElement);

		if (layer !== undefined) {
			layer.bindPopup(popup);
			// layer.on("popupopen", () => (open = true));
			// layer.on("popupclose", () => (open = false));
		}
	});

	onDestroy(() => {
		layer?.unbindPopup();
		popup?.remove();
		popup = undefined;
	});
</script>

<div bind:this={popupElement} class="flex-row popup__content">
	{#if popupData.type === "line"}
		<i>{popupData.duration}</i>
		<div class="product--{popupData.line.product} line--vertical line--product"></div>
		<span>{popupData.line.name} &rightarrow; {popupData.direction}</span>
	{:else if popupData.type === "walk"}
		<i>{popupData.duration}</i>
		<div class="filler-icon">
			<IconFiller type="walk" smallIcon={true} />
		</div>
		<span>{popupData.distance}m Fußweg (ca. <i>{popupData.walkingTime}</i>)</span>
	{:else}
		{#if popupData.transitData.time.arrival !== undefined || popupData.transitData.time.departure !== undefined}
			<Time time={popupData.transitData.time} />
		{/if}
		<div class="flex-column middle">
			<div class="line--vertical product--{popupData.product1} line--product"></div>
			<div class="icon product--{popupData.product1 ?? popupData.product2}">
				<slot />
			</div>
			<div class="line--vertical product--{popupData.product2} line--product"></div>
		</div>
		<NameDelayPlatform transitData={popupData.transitData} />
	{/if}
</div>

<style>
	.flex-row {
		gap: calc(1rem - 4px);
		& > i {
			white-space: nowrap;
		}
		& > .line--vertical {
			flex-shrink: 0;
		}
		align-items: center;
	}
	.icon {
		margin: -16px 0;
		display: flex;
		position: relative;
	}
	.middle {
		justify-content: center;
		justify-items: center;
	}
	.filler-icon {
		display: flex;
		margin: auto -6px;
	}
	.line--vertical {
		margin: 0 auto;
		min-height: calc(var(--line-length--vertical));
		flex-shrink: 0;
	}
</style>
