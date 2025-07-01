<script lang="ts">
	import type { KeyedItem, ParsedLocation } from "$lib/types";
	import { DIAGRAM_MAX_COLUMNS } from "$lib/constants";
	import { toast } from "$lib/state/toastStore";
	import IconSwap from "$lib/components/icons/IconSwap.svelte";
	import StationInput from "./StationInput.svelte";
	import IconClose from "$lib/components/icons/IconClose.svelte";
	import IconPlus from "$lib/components/icons/IconPlus.svelte";
	import { flip } from "svelte/animate";
	import { scale } from "svelte/transition";

	type Props = {
		stops: KeyedItem<ParsedLocation | undefined, number>[];
	};

	let { stops = $bindable() }: Props = $props();

	const isFirstStationDefined = $derived(stops[0]?.value !== undefined);
	const isLastStationDefined = $derived(stops.at(-1)?.value !== undefined);

	function removeVia(index: number): void {
		stops = [...stops.slice(0, index), ...stops.slice(index + 1, stops.length)];
	}
	function addVia(index: number): void {
		if (stops.length > DIAGRAM_MAX_COLUMNS) {
			toast(`Es sind maximal ${DIAGRAM_MAX_COLUMNS - 1} Zwischenstationen möglich.`, "red");
			return;
		}
		stops = [
			...stops.slice(0, index),
			{ value: undefined, key: Math.random() },
			...stops.slice(index, stops.length)
		];
	}
	function reverseStops(): void {
		stops = stops.toReversed();
	}
</script>

<div class="location-inputs--outer flex-row">
	<div
		class="location-inputs"
		class:first-station-defined={isFirstStationDefined}
		class:last-station-defined={isLastStationDefined}
	>
		{#each stops as stop, i (stop.key)}
			<div
				class="flex-row input-container"
				transition:scale
				onintrostart={(e) =>
					void (
						e.target instanceof Element &&
						e.target.classList.add("input-container--transitioning")
					)}
				onintroend={(e) =>
					void (
						e.target instanceof Element &&
						e.target.classList.remove("input-container--transitioning")
					)}
				onoutrostart={(e) =>
					void (
						e.target instanceof Element &&
						e.target.classList.add("input-container--transitioning")
					)}
				animate:flip={{ duration: 400 }}
			>
				<button
					class="add-button hoverable hoverable--visible"
					type="button"
					onclick={() => void addVia(i)}
					title="Station hinzufügen"
				>
					<IconPlus />
				</button>
				<StationInput
					bind:selectedLocation={stop.value}
					inputPlaceholder={i === 0
						? "Start"
						: i < stops.length - 1
							? "Zwischenstation"
							: "Ziel"}
				/>
				<button
					class="remove-button hoverable hoverable--visible"
					type="button"
					onclick={() => void removeVia(i)}
					title="Station entfernen"
				>
					<IconClose />
				</button>
				<button
					class="hoverable hoverable--visible switch-button"
					type="button"
					onclick={reverseStops}
					title="Stationsreihenfolge umkehren"
					aria-label="Stationsreihenfolge umkehren"
				>
					<IconSwap />
				</button>
				<button
					class="add-button a2 hoverable hoverable--visible"
					type="button"
					onclick={() => void addVia(i + 1)}
					title="Station hinzufügen"
				>
					<IconPlus />
				</button>
			</div>
		{/each}
	</div>
</div>

<style>
	.location-inputs--outer {
		--input-container-height: calc(2 * var(--line-width) + 1rem + 1lh);
		width: 30rem;
		max-width: 100%;
		align-items: center;
	}

	.location-inputs {
		width: 100%;
		margin: calc(var(--input-container-height) / 2 - var(--line-width)) 0;
	}

	.input-container {
		height: calc(2 * var(--line-width) + 1rem + 1lh);
		padding: calc(var(--line-width) / 2) 0 calc(var(--line-width) / 2)
			calc(2rem + 3 * var(--line-width));
		gap: var(--line-width);
		position: relative;
	}

	.add-button {
		position: absolute;
		left: 0;
		top: 50%;
		z-index: 5;
		transition: scale 0.4s var(--cubic-bezier--regular);
	}

	.input-container:first-child .remove-button {
		visibility: hidden;
	}

	.input-container:not(:first-child) .add-button:first-child,
	.input-container:last-child .remove-button,
	.input-container:not(:last-child) .switch-button {
		display: none;
	}

	.add-button:first-child,
	.input-container:last-child:nth-child(2) .switch-button {
		translate: 0 calc((var(--input-container-height) + var(--line-width)) / -2 - 50%);
	}
	.add-button:last-child {
		translate: 0 calc((var(--input-container-height) + var(--line-width)) / 2 - 50%);
	}

	.input-container:last-child:nth-child(2) .switch-button {
		translate: 0 calc((var(--input-container-height) + var(--line-width)) / -2);
	}

	.switch-button,
	.remove-button {
		align-self: center;
		transition: translate 0.4s var(--cubic-bezier--regular);
	}

	.location-inputs:not(.first-station-defined)
		.input-container:first-child
		.add-button:first-child {
		scale: 0;
	}

	.location-inputs:not(.last-station-defined) .input-container:last-child .add-button:last-child {
		scale: 0;
	}
</style>
