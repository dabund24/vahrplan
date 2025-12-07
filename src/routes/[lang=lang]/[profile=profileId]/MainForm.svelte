<script lang="ts">
	import { type KeyedItem, type ParsedLocation, type RelativeTimeType } from "$lib/types.js";
	import { dateToInputDate, valueIsDefined } from "$lib/util.js";
	import { settings } from "$lib/state/settingStore";
	import SingleSelect from "$lib/components/SingleSelect.svelte";
	import { get } from "svelte/store";
	import { toast } from "$lib/state/toastStore";
	import { getCurrentGeolocation } from "$lib/geolocation.svelte.js";
	import FilterModal from "./FilterModal.svelte";
	import { searchDiagram, type DisplayedFormData } from "$lib/state/displayedFormData.svelte.js";
	import MainStationInputs from "./MainStationInputs.svelte";
	import { SvelteDate } from "svelte/reactivity";
	import { page } from "$app/state";

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

	function setTimePreset(minuteOffset: number): void {
		const now = new SvelteDate();
		now.setTime(now.getTime() + 60 * 1000 * minuteOffset);
		time = now;
	}

	async function handleFormSubmit(event: SubmitEvent): Promise<void> {
		event.preventDefault();
		const stopsToBeDisplayed = stops.filter(valueIsDefined);
		if (!verifyUserInput(stopsToBeDisplayed.map((s) => s.value))) {
			return;
		}
		const journeyTime = new SvelteDate(time);
		journeyTime.setSeconds(0, 0); // round minute to improve caching behaviour
		const scrollDirection: RelativeTimeType =
			departureArrivalSelection === 0 ? "later" : "earlier";
		const filters = { ...get(settings) };
		const profileConfig = page.data.profileConfig;
		const formData: DisplayedFormData = {
			locations: stopsToBeDisplayed.map((stop) => ({ ...stop })), // important, unwanted dom updates would happen otherwise later on!
			timeData: { type: "absolute", scrollDirection, time: journeyTime.toISOString() },
			filters,
			geolocationDate: new Date(),
			profileConfig
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

<form autocomplete="off" class="flex-column" onsubmit={(e) => void handleFormSubmit(e)}>
	<MainStationInputs bind:stops />

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
		container-type: inline-size;
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
		margin-top: 1.5rem;
		justify-content: end;
		gap: 0.5rem;
		& > button {
			width: fit-content;
			padding: 0.5rem 1rem;
		}
	}
</style>
