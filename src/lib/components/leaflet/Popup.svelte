<script lang="ts">
	import { L } from "$lib/stores";
	import { getContext, onDestroy, onMount } from "svelte";

	let popup: L.Popup | undefined;
	let popupElement: HTMLElement;

	let open = false;

	const { getLayer }: { getLayer: () => L.Layer | undefined } = getContext("layer");
	const layer = getLayer();

	onMount(() => {
		popup = $L.popup().setContent(popupElement);

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

<div bind:this={popupElement}>
	{#if open}
		<slot />
	{/if}
</div>
