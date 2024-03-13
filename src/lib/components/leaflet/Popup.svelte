<script lang="ts">
	import { L } from "$lib/stores";
	import { getContext, onDestroy, onMount } from "svelte";
	import type { PopupData } from "$lib/types";
	import Time from "$lib/components/Time.svelte";
	import NameDelayPlatform from "$lib/components/NameDelayPlatform.svelte";
	import "./popup.css"

	export let popupData: PopupData;
	let popup: L.Popup | undefined;
	let popupElement: HTMLElement;

	let open = false;

	const { getLayer }: { getLayer: () => L.Layer | undefined } = getContext("layer");
	const layer = getLayer();

	onMount(() => {
		popup = $L.popup({ className: "map__popup", closeButton: false }).setContent(popupElement);

		if (layer !== undefined) {
			layer.bindPopup(popup);
			layer.on("popupopen", () => (open = true));
			layer.on("popupclose", () => (open = false));
		}
	});

	onDestroy(() => {
		layer?.unbindPopup();
		popup?.remove();
		popup = undefined;
	});
</script>

<div bind:this={popupElement} class="flex-row popup__content" class:open>
		{#if popupData.type === "line"}
			<i>{popupData.duration}</i>
			<div class="product--{popupData.line.product} line--vertical line--product"></div>
			<span>{popupData.line.name} &rightarrow; {popupData.direction}</span>
		{:else}
			<Time time={popupData.transitData.time} />
			<div class="product--{popupData.product} line--vertical line--product"></div>
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
			min-height: var(--line-length--vertical);
		}
		align-items: center;
    }
</style>
