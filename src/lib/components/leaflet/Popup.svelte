<script lang="ts">
	import L from "leaflet";
	import { getContext, onDestroy, onMount, type Snippet } from "svelte";
	import type { PopupData } from "$lib/types";
	import Time from "$lib/components/Time.svelte";
	import NameDelayPlatform from "$lib/components/journeys/NameDelayPlatform.svelte";
	import "./popup.css";
	import IconFiller from "$lib/components/icons/IconFiller.svelte";
	import Duration from "$lib/components/Duration.svelte";

	type Props = {
		popupData: PopupData;
		// the icon to be displayed in the popup
		children?: Snippet;
	};

	let { popupData, children }: Props = $props();
	let popup: L.Popup | undefined;
	let popupElement: HTMLElement;

	const { getLayer }: { getLayer: () => L.Layer | undefined } = getContext("layer");
	const layer = getLayer();

	onMount(() => {
		popup = L.popup({ className: "map__popup", closeButton: false }).setContent(popupElement);

		if (layer !== undefined) {
			layer.bindPopup(popup);
		}
	});

	$effect(() => void popup?.setContent(popupElement));

	onDestroy(() => {
		layer?.unbindPopup();
		popup?.remove();
		popup = undefined;
	});
</script>

<div bind:this={popupElement} class="flex-row popup__content">
	{#if popupData.type === "line"}
		<Duration duration={popupData.duration} />
		<div class="product--{popupData.product} line--vertical line--product"></div>
		<span>{popupData.name} &rightarrow; {popupData.direction}</span>
	{:else if popupData.type === "walk"}
		<Duration duration={popupData.duration} />
		<div class="filler-icon">
			<IconFiller type="walk" smallIcon={true} />
		</div>
		<span>
			{#if popupData.distance !== undefined && popupData.walkingTime !== undefined}
				{popupData.distance}m Fußweg (ca. <i>{popupData.walkingTime}min</i>)
			{:else}
				Fußweg
			{/if}
		</span>
	{:else if popupData.type === "onward-journey"}
		<Duration duration={popupData.duration} />
		<div class="filler-icon">
			<IconFiller type="onward-journey" smallIcon={true} />
		</div>
		<span>
			Anreise zur nächsten Station{#if popupData.recommendedAction !== undefined},
				{popupData.recommendedAction}
			{/if}
			({(popupData.distance - (popupData.distance % 100)) / 1000}km, ca.
			<i>{popupData.travelTime}min</i>)
		</span>
	{:else}
		{#if popupData.transitData.time.arrival !== undefined || popupData.transitData.time.departure !== undefined}
			<Time time={popupData.transitData.time} />
		{/if}
		<div class="flex-column middle">
			<div class="line--vertical product--{popupData.product1} line--product"></div>
			<div class="icon product--{popupData.product1 ?? popupData.product2}">
				{@render children?.()}
			</div>
			<div class="line--vertical product--{popupData.product2} line--product"></div>
		</div>
		<NameDelayPlatform transitData={popupData.transitData} />
	{/if}
</div>

<style>
	.flex-row {
		gap: calc(1rem - 4px);
		align-items: center;
	}
	.icon {
		margin: -16px 0;
		display: flex;
		position: relative;
	}
	.middle {
		display: flex;
		width: 16px;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		& > * {
			flex-shrink: 0;
			width: 16px;
		}
	}
	.filler-icon {
		display: flex;
		margin: auto -6px;
		flex-shrink: 0;
	}
	.line--vertical {
		margin: 0 auto;
		min-height: calc(var(--line-length--vertical));
		flex-shrink: 0;
	}
</style>
