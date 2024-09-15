<script lang="ts">
	import StationInput from "./StationInput.svelte";
	import { type KeyedItem, type ParsedLocation, type TransitType } from "$lib/types.js";
	import { dateToInputDate, getCurrentGeolocation, valueIsDefined } from "$lib/util.js";
	import {
		type DisplayedFormData,
		setDisplayedFormDataAndTree
	} from "$lib/stores/journeyStores.js";
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";
	import Modal from "$lib/components/Modal.svelte";
	import Tabs from "$lib/components/Tabs.svelte";
	import Setting from "$lib/components/Setting.svelte";
	import { products, settings } from "$lib/stores/settingStore";
	import { goto, pushState } from "$app/navigation";
	import { page } from "$app/stores";
	import SingleSelect from "$lib/components/SingleSelect.svelte";
	import { getDiagramUrlFromFormData } from "$lib/urls";
	import { get } from "svelte/store";
	import type { ComponentProps } from "svelte";
	import IconClose from "$lib/components/icons/IconClose.svelte";
	import { toast } from "$lib/stores/toastStore";

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
		} else {
			stops = initialFormData.locations;
		}
	});

	let departureArrivalSelection: 0 | 1 = $state(0);
	let timeIsNow = $state(true);
	let time = $state(dateToInputDate(new Date()));

	$effect.pre(() => initTimeInputs(initialFormData));

	function initTimeInputs(displayedFormData: DisplayedFormData | undefined): void {
		if (displayedFormData === undefined) {
			departureArrivalSelection = 0;
			timeIsNow = true;
			time = dateToInputDate(new Date());
			return;
		}

		departureArrivalSelection = displayedFormData.timeRole === "arrival" ? 1 : 0;
		timeIsNow =
			~~(new Date().getTime() / 60000) === ~~(displayedFormData.time.getTime() / 60000);
		time = dateToInputDate(displayedFormData.time);
	}

	function removeVia(index: number): void {
		stops = [...stops.slice(0, index), ...stops.slice(index + 1, stops.length)];
	}
	function addVia(index: number): void {
		if (stops.length >= 7) {
			toast("Es sind maximal fünf Zwischenstationen möglich.", "red");
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
		const journeyTime = timeIsNow ? new Date() : new Date(time);
		journeyTime.setSeconds(0, 0); // round minute to improve caching behaviour
		const timeRole: TransitType = departureArrivalSelection === 0 ? "departure" : "arrival";
		const options = get(settings).journeysOptions;
		const formData: DisplayedFormData = {
			locations: stopsToBeDisplayed.map((stop) => ({ ...stop })), // important, unwanted dom updates would happen otherwise later on!
			time: journeyTime,
			timeRole,
			options,
			geolocationDate: new Date()
		};
		// handle current position
		if (formData.locations.some((l) => l.value.type === "currentLocation")) {
			const currentLocation = await getCurrentGeolocation();
			formData.geolocationDate = currentLocation.asAt;
			formData.locations = formData.locations.map((l) => {
				if (l.value.type === "currentLocation") {
					return { key: l.key, value: currentLocation };
				}
				return l;
			});
		}

		void goto(getDiagramUrlFromFormData(formData));

		setDisplayedFormDataAndTree(formData);
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

	function showFilterModal(): void {
		pushState("", {
			showFilterModal: true
		});
	}

	const modalTabContent: ComponentProps<Tabs>["tabs"] = [
		{
			title: "Allgemein",
			content: generalFilter
		},
		{
			title: "Verkehrsmittel",
			content: meansFilter
		}
	];
</script>

{#snippet generalFilter()}
	<Setting
		settingName="Fahrradmitnahme"
		bind:setting={$settings.journeysOptions.bike}
		settingInfo={{ type: "boolean" }}
	/>
	<Setting
		settingName="Barrierefreiheit"
		bind:setting={$settings.journeysOptions.accessibility}
		settingInfo={{
			type: "options",
			options: [
				{ value: "none", name: "ignorieren" },
				{ value: "partial", name: "bevorzugen" },
				{ value: "complete", name: "strikt" }
			]
		}}
	/>
	<Setting
		settingName="Maximale Umstiegsanzahl"
		bind:setting={$settings.journeysOptions.transfers}
		settingInfo={{
			type: "options",
			options: [
				{ value: 0, name: "0" },
				{ value: 1, name: "1" },
				{ value: 2, name: "2" },
				{ value: 3, name: "3" },
				{ value: 4, name: "4" },
				{ value: 5, name: "5" },
				{ value: -1, name: "beliebig" }
			]
		}}
	/>
	<Setting
		settingName="Mindestumsteigezeit"
		bind:setting={$settings.journeysOptions.transferTime}
		settingInfo={{
			type: "options",
			options: [
				{ value: 0, name: "0min" },
				{ value: 2, name: "2min" },
				{ value: 5, name: "5min" },
				{ value: 10, name: "10min" },
				{ value: 15, name: "15min" },
				{ value: 20, name: "20min" },
				{ value: 30, name: "30min" },
				{ value: 40, name: "40min" },
				{ value: 50, name: "50min" },
				{ value: 60, name: "1h" }
			]
		}}
	/>
{/snippet}
{#snippet meansFilter()}
	{#each Object.entries(products) as [product, productName]}
		<Setting
			settingName={productName}
			bind:setting={$settings.journeysOptions.products[product]}
			settingInfo={{ type: "boolean" }}
		/>
	{/each}
{/snippet}

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
						<svg width="16px" height="16px">
							<g
								stroke="var(--foreground-color)"
								stroke-width="3"
								stroke-linecap="round"
							>
								<line x1="8" y1="2" x2="8" y2="14" />
								<line x1="2" y1="8" x2="14" y2="8" />
							</g>
						</svg>
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
						title="Stationsreihenfolge tauschen"
					>
						<svg width="16px" height="16px">
							<g
								stroke="var(--foreground-color)"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								fill="none"
							>
								<polyline points="5.5,2 5.5,14 1.5,10" />
								<polyline points="10.5,14 10.5,2 14.5,6" />
							</g>
						</svg>
					</button>
				</div>
			{/each}
		</div>
	</div>
	<div class="time-filter-submit" class:time-is-now={timeIsNow}>
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
				bind:setting={timeIsNow}
				settingInfo={{ type: "boolean" }}
			/>
		</div>
		<div class="time-input-container">
			{#if timeIsNow !== undefined && !timeIsNow}
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
			<button
				class="hoverable hoverable--visible padded-top-bottom"
				onclick={showFilterModal}
				type="button"
				title="Verbindungen filtern"
			>
				Filter
			</button>
			{#if $page.state.showFilterModal}
				<Modal title="Filter" height={"32rem"} bind:showModal={$page.state.showFilterModal}>
					<Tabs
						tabs={modalTabContent}
						isBelowHeaderMobile={true}
						isBelowHeaderDesktop={true}
						padContent={true}
					/>
				</Modal>
			{/if}
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
