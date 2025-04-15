<script lang="ts">
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";
	import type { JourneyBlock, LegBlock, ParsedTime } from "$lib/types.js";
	import Time from "$lib/components/Time.svelte";
	import Modal from "$lib/components/Modal.svelte";
	import LegRegular from "$lib/components/journeys/LegRegular.svelte";
	import SummaryStationIcon from "./SummaryStationIcon.svelte";
	import { dateDifference } from "$lib/util";
	import Duration from "$lib/components/Duration.svelte";
	import DateDuration from "$lib/components/DateDuration.svelte";
	import { pushState } from "$app/navigation";
	import Warning from "$lib/components/Warning.svelte";
	import { shareDiagram } from "./share";
	import IconShare from "$lib/components/icons/IconShare.svelte";
	import { toggleDiagramBookmark, getBookmarks, type DiagramBookmark } from "$lib/bookmarks";
	import IconBookmark from "$lib/components/icons/IconBookmark.svelte";
	import { onMount, type Snippet } from "svelte";
	import IconRightArrow from "$lib/components/icons/IconRightArrow.svelte";
	import { browser } from "$app/environment";
	import TitlelessHeader from "$lib/components/TitlelessHeader.svelte";
	import { getGeolocationString } from "$lib/geolocation.svelte";
	import ViaRecommendations from "./ViaRecommendations.svelte";
	import TrainProgressIndicator from "$lib/components/TrainProgressIndicator.svelte";
	import { getSelectedData } from "$lib/state/selectedData.svelte.js";
	import { type DisplayedJourney, getDisplayedJourney } from "$lib/state/displayedJourney.svelte";
	import { getDisplayedFormData } from "$lib/state/displayedFormData.svelte.js";
	import { getDiagramData } from "$lib/state/diagramData.svelte";
	import { apiClient } from "$lib/api-client/apiClientFactory";
	import LineNameDirection from "$lib/components/LineNameDirection.svelte";

	type Props = { miniTabsSnippet: Snippet };

	const { miniTabsSnippet }: Props = $props();

	const selectedData = $derived(getSelectedData());
	const displayedJourney = $derived(getDisplayedJourney());
	const displayedFormData = $derived(getDisplayedFormData());
	const diagramData = $derived(getDiagramData());

	type SubJourneyInfo = {
		legs: LegBlock[];
		departure: ParsedTime;
		arrival: ParsedTime;
	};

	const journeyInfo = $derived(computeJourneyInfo(displayedJourney));
	function computeJourneyInfo(displayedJourney: DisplayedJourney): SubJourneyInfo[] {
		return [
			...displayedJourney.selectedSubJourneys.map((subJourney) => {
				return {
					legs: subJourney?.blocks.filter<LegBlock>(isLeg) ?? [],
					departure: {
						departure: {
							time: subJourney?.departureTime?.time ?? new Date(0).toISOString()
						}
					},
					arrival: {
						arrival: {
							time: subJourney?.arrivalTime?.time ?? new Date(0).toISOString()
						}
					}
				};
			}),
			{ legs: [], departure: {}, arrival: {} }
		];
	}

	function isLeg(block: JourneyBlock): block is LegBlock {
		return block.type === "leg";
	}

	let pressedStationId = $state(0);

	let modalLeg: LegBlock | undefined = $state();
	function showLegModal(leg: LegBlock): void {
		modalLeg = { ...leg };
		pushState("", {
			showLegModal: true
		});
	}

	const areStopovers = $derived(computeAreStopovers(displayedJourney));
	function computeAreStopovers(displayedJourney: DisplayedJourney): boolean[] {
		return displayedJourney.blocks
			.filter((_, index) => index % 2 === 0)
			.map((block) => block?.value[0]?.type === "transfer" && block.value[0].isStopover);
	}

	const diagramApiClient = apiClient("GET", "/api/diagram");
	let diagramBookmarks: DiagramBookmark[] = $state([]);
	let isBookmarked = $derived(
		browser &&
			displayedFormData !== undefined &&
			diagramBookmarks.some(
				(bookmark) =>
					bookmark.link ===
					diagramApiClient.formatNonApiUrl(
						diagramApiClient.formDataToRequestData(displayedFormData)
					).href
			)
	);

	onMount(() => (diagramBookmarks = getBookmarks("diagram")));

	function handleDiagramBookmarkClick(): void {
		diagramBookmarks = toggleDiagramBookmark(displayedFormData);
	}
</script>

<TitlelessHeader --header-width="calc(var(--diagram-width) - 2rem">
	<div id="journey-summary" class="flex-column summary-background">
		<div class="flex-row actions" class:all-selected={selectedData.isFullJourneySelected}>
			<div class="mini-tab-container">
				{@render miniTabsSnippet()}
			</div>
			{#await diagramData then { recommendedVias }}
				<ViaRecommendations {recommendedVias} />
			{/await}
			<button
				class="hoverable hoverable--visible"
				onclick={() => void shareDiagram(displayedFormData)}
				title="Diagramm teilen"
			>
				<IconShare />
			</button>
			<button
				class="hoverable hoverable--visible"
				onclick={handleDiagramBookmarkClick}
				title="Diagram merken"
			>
				<IconBookmark {isBookmarked} />
			</button>
			{#if selectedData.isFullJourneySelected}
				<a
					href={apiClient("GET", "/api/journey").formatNonApiUrl(
						displayedJourney.selectedSubJourneys.map((j) => j?.refreshToken ?? "")
					).href}
					class="hoverable hoverable--accent"
					title="Reisedetails anzeigen"
					transition:scale
				>
					<IconRightArrow />
				</a>
			{/if}
		</div>
		<div class="flex-row">
			{#each displayedJourney?.locations ?? [] as location, i (location.key)}
				<div
					class="summary-element flex-column"
					class:station--selected={journeyInfo[i].legs.length > 0}
					transition:scale
					animate:flip={{ duration: 400 }}
				>
					<strong class="station-name limit-lines"
						>{location.value.type === "currentLocation"
							? getGeolocationString(location.value.asAt)
							: location.value.name}</strong
					>
					<div class="visuals-container flex-row">
						<div class="station-icon-container">
							<SummaryStationIcon
								location={location.value}
								locationIndex={i}
								isStopover={areStopovers[i]}
								isDisplayedLocation={true}
								bind:pressedStationId
							/>
						</div>
						<div class="visuals--selected">
							<div class="intermediate-stations flex-row">
								{#each journeyInfo[i]?.legs.slice(1) ?? [] as leg (leg.departureData.location.requestParameter)}
									<div
										class="station-icon-container"
										transition:scale
										animate:flip={{ duration: 400 }}
									>
										<SummaryStationIcon
											location={leg.departureData.location}
											locationIndex={i}
											isDisplayedLocation={false}
											bind:pressedStationId
										></SummaryStationIcon>
									</div>
								{/each}
							</div>
							<div class="lines flex-row">
								{#each journeyInfo[i]?.legs ?? [] as leg (leg.blockKey)}
									<div
										class="leg-container flex-row"
										in:scale
										animate:flip={{ duration: 400 }}
									>
										<TrainProgressIndicator
											orientation="horizontal"
											product={leg.product}
											departureTime={new Date(
												leg.departureData.time.departure?.time ?? 0
											).getTime()}
											arrivalTime={new Date(
												leg.arrivalData.time.arrival?.time ?? 0
											).getTime()}
										/>
										<button
											class="line-container hoverable"
											onclick={() => void showLegModal(leg)}
											title={leg.name}
											aria-label={leg.name}
										>
											<span class="line--product product--{leg.product}"
											></span>
										</button>
									</div>
								{/each}
							</div>
						</div>
					</div>
					<div class="times-container flex-row">
						<div class="times--station flex-row">
							<span class="arrival-time">
								<Time time={journeyInfo.at(i - 1)?.arrival ?? {}} />
							</span>
							<span class="wait-time">
								<Duration
									duration={dateDifference(
										journeyInfo.at(i - 1)?.arrival.arrival?.time,
										journeyInfo[i]?.departure.departure?.time
									)}
								/>
							</span>
							<span class="departure-time time">
								<Time time={journeyInfo[i]?.departure ?? {}} />
							</span>
						</div>
						<div class="times--journey flex-row">
							<Duration
								duration={dateDifference(
									journeyInfo[i]?.departure.departure?.time,
									journeyInfo[i]?.arrival.arrival?.time
								) ?? 0}
							/>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</TitlelessHeader>
{#if modalLeg}
	<Modal showModalKey="showLegModal">
		{#snippet title()}
			<LineNameDirection
				lineName={modalLeg?.name}
				direction={modalLeg?.direction}
				productName={modalLeg?.productName}
				lineShape={modalLeg?.lineShape}
			/>
		{/snippet}
		<div class="padded-top-bottom">
			{#each modalLeg.info.statuses as status}
				<Warning color="red">{status}</Warning>
			{/each}
			<DateDuration
				date={modalLeg.departureData.time.departure?.time}
				duration={modalLeg.duration}
			/>
			<LegRegular block={modalLeg} isCompact={true} />
		</div>
	</Modal>
{/if}

<style>
	.actions {
		position: sticky;
		left: 0;
		padding: 4px 0 0.5rem;
		gap: 4px;
		width: min(100%, 100cqw - 1rem); /* scrollbar is not part of container :/ */
		.mini-tab-container {
			margin-right: auto;
		}
		button:last-of-type {
			transition: margin-right 0.4s var(--cubic-bezier);
		}
		a {
			display: none;
			position: absolute;
			right: 0;
		}
	}

	@media screen and (max-width: 999px) {
		.actions {
			padding: 0.5rem 0;
			left: 0.75rem;
			width: min(100%, 100cqw - 1.5rem);
			&.all-selected > button:last-of-type {
				margin-right: calc(12px + 2rem);
			}
			a {
				display: block;
			}
		}
	}

	#journey-summary,
	#journey-summary ~ :global(.transition) {
		padding: 0 var(--line-width);
		margin: 0 calc(-1 * var(--line-width));
	}

	#journey-summary {
		word-break: break-word;
	}

	@media screen and (max-width: 999px) {
		#journey-summary {
			padding-top: env(safe-area-inset-top);
		}
	}

	:global(.pane:has(~ .dragging) .titleless-header),
	:global(.container.loading .titleless-header) {
		transition: none;
	}

	.summary-element {
		width: var(--diagram-width);
		margin-top: auto;
		flex: 2 0;
		text-align: center;
		--product-color: var(--foreground-color);
		&:first-child,
		&:last-child {
			flex: 1 0;
		}
	}

	.station--selected,
	.station--selected + .summary-element {
		--product-color: var(--accent-color);
	}

	/* handle special cases */

	.summary-element:nth-last-child(2) .times-container {
		margin-right: calc(var(--connection-width) / -2 + var(--diagram--beginning-end-offset));
	}

	.summary-element:first-child {
		& .station-name {
			text-align: left;
		}
		& .visuals-container {
			margin: 0 calc(var(--connection-width) / -2) 0 var(--diagram--beginning-end-offset);
			& > .station-icon-container {
				left: 0;
			}
		}
		& .visuals--selected {
			margin: 0;
		}
		& .times-container {
			margin: 0 calc(var(--connection-width) / -2) 0 var(--diagram--beginning-end-offset);
		}
	}

	.summary-element:nth-last-child(2):not(:first-child) .visuals--selected {
		margin: 0 calc(var(--connection-width) / -2 + var(--diagram--beginning-end-offset)) 0
			calc(var(--connection-width) / 2);
	}

	.summary-element:first-child:nth-last-child(2) {
		& .visuals-container,
		& .times-container {
			margin: 0 calc(var(--connection-width) / -2 + var(--diagram--beginning-end-offset)) 0
				var(--diagram--beginning-end-offset);
		}
	}

	.summary-element:last-child {
		& .station-name {
			text-align: right;
		}
		& .visuals-container {
			margin: 0 var(--diagram--beginning-end-offset) 0 auto;
		}
		& .times-container {
			margin: 0 0 0 calc(var(--connection-width) / 2 - var(--diagram--beginning-end-offset));
		}
		& .times--journey {
			width: 0;
		}
	}

	/* rules for name */

	.station-name {
		width: 100%;
		overflow-x: hidden;
		text-overflow: ellipsis;
		text-wrap: balance;
		-webkit-line-clamp: 3;
		line-clamp: 3;
	}

	/* rules for everything between name and time data */

	.visuals-container {
		height: calc(24px + 2 * var(--line-width));
		& .visuals--selected {
			position: relative;
			width: 100%;
			height: 100%;
			margin: 0 calc(var(--connection-width) / -2) 0 calc(var(--connection-width) / 2);
		}
		& .lines {
			position: absolute;
			width: 100%;
			height: 100%;
			.leg-container {
				width: 100%;
				align-items: center;
				position: relative;
			}
		}
		& .intermediate-stations {
			position: absolute;
			width: 100%;
			justify-content: space-evenly;
		}
		& .station-icon-container {
			z-index: 2;
			position: relative;
			margin: 0 -16px;
			border-radius: 100%;
		}
		& > .station-icon-container {
			left: 50%;
		}
		& .line-container {
			position: relative;
			align-self: center;
			height: 100%;
			width: calc(100% + 32px);
			display: flex;
			align-items: center;
			border-radius: 50vh;
			margin: 0 -16px;
			padding: 0 12px;
			&:hover {
				z-index: 1;
			}
			& .line--product {
				width: 100%;
				height: var(--line-width);
				border-radius: var(--border-radius--small);
			}
		}
	}

	/* rules for times-container */

	.times-container {
		margin: 0 calc(var(--connection-width) / -2) 0 calc(var(--connection-width) / 2);
		z-index: 1;
		white-space: nowrap;
		position: relative;
	}

	.times--station {
		position: absolute;
		translate: -50% 0;
		& > * {
			display: none;
		}
	}

	.times--journey {
		width: 100%;
		visibility: hidden;
	}

	/* selected journey */
	.station--selected .times--journey {
		display: inline;
	}

	/* show wait time between two selected journeys */
	.station--selected + .station--selected .wait-time {
		display: inline;
	}

	/* show departure when not preceded by selected journey */
	.summary-element:not(.station--selected) + .station--selected .departure-time,
	.station--selected:first-child .departure-time {
		display: inline;
	}

	/* show arrival when not succeeded by selected journey */
	.station--selected + .summary-element:not(.station--selected) .arrival-time {
		display: inline;
	}

	.station--selected .times--journey {
		visibility: visible;
	}
</style>
