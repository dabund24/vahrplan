<script lang="ts">
	import StationInput from "./StationInput.svelte";
	import { type KeyedItem, type ParsedLocation, type RelativeTimeType } from "$lib/types.js";
	import { dateToInputDate, valueIsDefined } from "$lib/util.js";
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { settings } from "$lib/state/settingStore";
	import SingleSelect from "$lib/components/SingleSelect.svelte";
	import { get } from "svelte/store";
	import IconClose from "$lib/components/icons/IconClose.svelte";
	import { toast } from "$lib/state/toastStore";
	import { getCurrentGeolocation } from "$lib/geolocation.svelte.js";
	import IconPlus from "$lib/components/icons/IconPlus.svelte";
	import FilterModal from "./FilterModal.svelte";
	import IconSwap from "$lib/components/icons/IconSwap.svelte";
	import { searchDiagram, type DisplayedFormData } from "$lib/state/displayedFormData.svelte.js";
	import { DIAGRAM_MAX_COLUMNS } from "$lib/constants";

	type Props = {
		initialFormData?: DisplayedFormData;
	};

	let { initialFormData }: Props = $props();

	let stops: KeyedItem<ParsedLocation | undefined, number>[] = $state([
		{ value: undefined, key: Math.random() },
		{ value: undefined, key: Math.random() }
	]);
	$effect.pre(() => {
		if (initialFormData === undefined) {
			stops = [
				{ value: undefined, key: Math.random() },
				{ value: undefined, key: Math.random() }
			];
			return;
		}
		stops = initialFormData.locations;
	});

	let departureArrivalSelection: 0 | 1 = $state(0);
	let time = $state(new Date());

	$effect.pre(() => initTimeInputs(initialFormData));

	function initTimeInputs(displayedFormData: DisplayedFormData | undefined): void {
		if (displayedFormData === undefined) {
			return;
		}

		departureArrivalSelection =
			displayedFormData.timeData.scrollDirection === "earlier" ? 1 : 0;
		time = new Date(dateToInputDate(displayedFormData.timeData.time));
	}

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

	function setTimePreset(minuteOffset: number): void {
		const now = new Date();
		now.setTime(now.getTime() + 60 * 1000 * minuteOffset);
		time = now;
	}

	async function handleFormSubmit(event: SubmitEvent): Promise<void> {
		event.preventDefault();
		const stopsToBeDisplayed = stops.filter(valueIsDefined);
		if (!verifyUserInput(stopsToBeDisplayed.map((s) => s.value))) {
			return;
		}
		const journeyTime = new Date(time);
		journeyTime.setSeconds(0, 0); // round minute to improve caching behaviour
		const scrollDirection: RelativeTimeType =
			departureArrivalSelection === 0 ? "later" : "earlier";
		const options = get(settings).journeysOptions;
		const formData: DisplayedFormData = {
			locations: stopsToBeDisplayed.map((stop) => ({ ...stop })), // important, unwanted dom updates would happen otherwise later on!
			timeData: { type: "absolute", scrollDirection, time: journeyTime.toISOString() },
			options,
			geolocationDate: new Date()
		};
		// handle current position
		if (formData.locations.some((l) => l.value.type === "currentLocation")) {
			const currentLocation = await getCurrentGeolocation();
			if (currentLocation === undefined) {
				return;
			}
			formData.geolocationDate = currentLocation.asAt;
			formData.locations = formData.locations.map((l) => {
				if (l.value.type === "currentLocation") {
					return { key: l.key, value: currentLocation };
				}
				return l;
			});
		}

		void searchDiagram(formData);
	}

	function verifyUserInput(stops: ParsedLocation[]): boolean {
		if (stops.length < 2) {
			toast("Start oder Ziel wurde nicht angegeben", "red");
			return false;
		}
		for (let i = 1; i < stops.length; i++) {
			if (stops[i].name === stops[i - 1].name) {
				toast(`Station ${stops[i].name} wurde mehrfach in Folge angegeben.`, "red");
				return false;
			}
		}
		return true;
	}
</script>

<form class="flex-column" onsubmit={(e) => void handleFormSubmit(e)}>
	<div class="location-inputs--outer flex-row">
		<div class="location-inputs">
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
				</div>
			{/each}
		</div>
	</div>
	<div class="time-filter-submit">
		<div class="flex-row">
			<SingleSelect
				titles={[
					{ type: "text", title: "Abfahrt" },
					{ type: "text", title: "Ankunft" }
				]}
				bind:selected={departureArrivalSelection}
			/>
		</div>
		<div class="time-input-container hoverable--visible--group flex-row">
			<div>
				<input
					class=""
					type="datetime-local"
					bind:value={
						(): string => {
							return dateToInputDate(time.toISOString());
						},
						(t): void => {
							time = new Date(t);
						}
					}
					aria-label={`${departureArrivalSelection === 0 ? "Abfahrt" : "Ankunft"}szeit`}
				/>
			</div>
			<div class="hoverable--visible--group--sep"><div></div></div>
			<div>
				<button type="button" onclick={() => void setTimePreset(0)}> jetzt </button>
			</div>
			<div>
				<button type="button" onclick={() => void setTimePreset(15)}> in 15min </button>
			</div>
			<div>
				<button type="button" onclick={() => void setTimePreset(60)}> in 1h </button>
			</div>
		</div>
		<div class="filter-submit">
			<FilterModal />
			<button
				class="hoverable hoverable--accent padded-top-bottom"
				type="submit"
				title="Verbindungen suchen"
			>
				Suchen
			</button>
		</div>
	</div>
</form>

<style>
	form {
		padding-top: calc(0.5rem + env(safe-area-inset-top));
		width: 100%;
		align-items: center;
	}
	.location-inputs--outer {
		width: 30rem;
		max-width: 100%;
		align-items: center;
	}

	.location-inputs {
		width: 100%;
	}

	.input-container {
		height: calc(8px + 1rem + 1lh);
		padding: calc(var(--line-width) / 2) 0;
		gap: var(--line-width);
	}

	.input-container:first-child .add-button,
	.input-container:first-child .remove-button {
		visibility: hidden;
	}
	.input-container:last-child .remove-button,
	.input-container:not(:last-child) .switch-button {
		display: none;
	}

	.add-button,
	.input-container:last-child:nth-child(2) .switch-button {
		translate: 0 calc(-0.5lh - 0.5rem - 6px);
		transition: translate 0.4s var(--cubic-bezier);
	}
	.remove-button,
	.add-button,
	.switch-button {
		align-self: center;
	}

	.time-filter-submit {
		width: 100%;
		max-width: 30rem;
		margin: 1rem 0;
		container-type: inline-size;
		> * {
			display: flex;
		}
		input[type="datetime-local"] {
			box-sizing: border-box;
			font-variant-numeric: tabular-nums;
			appearance: none;
			-webkit-appearance: none;
		}
		.time-input-container {
			padding-top: var(--line-width);
			> * {
				min-height: 100%;
			}
		}
	}

	@container (max-width: 29.5rem) {
		.time-input-container > :nth-child(4) {
			display: none;
		}
	}

	@container (max-width: 24rem) {
		.time-input-container > :nth-child(5) {
			display: none;
		}
		.time-input-container > :nth-child(3) button {
			border-top-right-radius: 50vh;
			border-bottom-right-radius: 50vh;
			padding-right: calc(var(--base-padding) + 0.25rem);
			&:not(:hover) {
				border-right: var(--border--very-transparant);
			}
		}
	}

	@container (max-width: 20.5rem) {
		.time-input-container > :where(:nth-child(2), :nth-child(3)) {
			display: none;
		}
		.time-input-container > :nth-child(1) input {
			border-radius: 50vh;
			padding-right: calc(var(--base-padding) + 0.25rem);
			&:not(:hover) {
				border-right: var(--border--very-transparant);
			}
		}
	}

	.filter-submit {
		margin-top: 1rem;
		justify-content: end;
		gap: 0.5rem;
		& > button {
			width: fit-content;
			padding: 0.5rem 1rem;
		}
	}
</style>
