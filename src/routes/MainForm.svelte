<script lang="ts">
	import StationInput from "./StationInput.svelte";
	import { type KeyedItem, type ParsedLocation, type RelativeTimeType } from "$lib/types.js";
	import { dateToInputDate, valueIsDefined } from "$lib/util.js";
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";
	import Setting from "$lib/components/Setting.svelte";
	import { settings } from "$lib/state/settingStore";
	import SingleSelect from "$lib/components/SingleSelect.svelte";
	import { get } from "svelte/store";
	import IconClose from "$lib/components/icons/IconClose.svelte";
	import { toast } from "$lib/state/toastStore";
	import { getCurrentGeolocation } from "$lib/geolocation.svelte";
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
				{
					value: undefined,
					key: Math.random()
				}
			];
			return;
		}
		stops = initialFormData.locations;
	});

	let departureArrivalSelection: 0 | 1 = $state(0);
	let isTimeNow = $state(true);
	let time = $state(dateToInputDate(new Date().toISOString()));

	$effect.pre(() => initTimeInputs(initialFormData));

	function initTimeInputs(displayedFormData: DisplayedFormData | undefined): void {
		if (displayedFormData === undefined) {
			departureArrivalSelection = 0;
			isTimeNow = true;
			time = dateToInputDate(new Date().toISOString());
			return;
		}

		departureArrivalSelection =
			displayedFormData.timeData.scrollDirection === "earlier" ? 1 : 0;
		isTimeNow =
			~~(new Date().getTime() / 60000) ===
			~~(new Date(displayedFormData.timeData.time).getTime() / 60000);
		time = dateToInputDate(displayedFormData.timeData.time);
	}

	function removeVia(index: number): void {
		stops = [...stops.slice(0, index), ...stops.slice(index + 1, stops.length)];
	}
	function addVia(index: number): void {
		if (stops.length - 1 > DIAGRAM_MAX_COLUMNS) {
			toast(`Es sind maximal ${DIAGRAM_MAX_COLUMNS} Zwischenstationen möglich.`, "red");
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

	async function handleFormSubmit(event: SubmitEvent): Promise<void> {
		event.preventDefault();
		const stopsToBeDisplayed = stops.filter(valueIsDefined);
		if (!verifyUserInput(stopsToBeDisplayed.map((s) => s.value))) {
			return;
		}
		const journeyTime = isTimeNow ? new Date() : new Date(time);
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
	<div class="time-filter-submit" class:time-is-now={isTimeNow}>
		<div class="flex-row">
			<SingleSelect
				titles={[
					{ type: "text", title: "Abfahrt" },
					{ type: "text", title: "Ankunft" }
				]}
				bind:selected={departureArrivalSelection}
			/>
			<Setting
				settingName="jetzt"
				bind:setting={isTimeNow}
				settingInfo={{ type: "boolean" }}
			/>
		</div>
		<div class="time-input-container">
			{#if isTimeNow !== undefined && !isTimeNow}
				<input
					transition:scale
					class="hoverable hoverable--visible"
					type="datetime-local"
					bind:value={time}
					aria-label={`${departureArrivalSelection === 0 ? "Abfahrt" : "Ankunft"}szeit`}
				/>
			{/if}
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
		gap: 4px;
		margin: 1rem 0;
		& > * {
			display: flex;
			justify-content: space-between;
		}
		& button {
			width: 100%;
			justify-content: center;
		}
		& .time-input-container {
			height: calc(16px + 1rem + 1lh);
		}
		input[type="datetime-local"] {
			padding: 0.5rem;
			margin: var(--line-width) 0;
			font-variant-numeric: tabular-nums;
		}
	}

	.filter-submit {
		margin-top: 1rem;
		transition: margin-top 0.4s var(--cubic-bezier);
		justify-content: end;
		gap: 0.5rem;
		& > button {
			width: fit-content;
			padding: 0.5rem 1rem;
		}
	}

	.time-is-now .filter-submit {
		margin-top: calc(-16px - 1lh);
	}
</style>
