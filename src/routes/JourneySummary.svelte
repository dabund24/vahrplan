<script lang="ts">
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { displayedLocations, selectedJourneys } from "$lib/stores.js";
	import type { JourneyBlock, LegBlock } from "$lib/types.js";
	import Time from "$lib/components/journeys/Time.svelte";
	import Modal from "$lib/components/Modal.svelte";
	import LegRegular from "$lib/components/journeys/LegRegular.svelte";
	import SummaryStationIcon from "./SummaryStationIcon.svelte";

	$: legss = [
		...$selectedJourneys.map((journeys) => journeys.blocks.filter<LegBlock>(isLeg)),
		[]
	];

	function isLeg(block: JourneyBlock): block is LegBlock {
		return block.type === "leg";
	}

	$: locationsActAsStopover = getStopoverActing(legss);

	function getStopoverActing(legss: LegBlock[][]): boolean[] {
		let actAsStopover: boolean[] = [false];
		for (let i = 1; i < legss.length; i++) {
			if (legss[i - 1].length === 0 || legss[i].length === 0) {
				actAsStopover.push(false);
				continue;
			}
			actAsStopover.push(legss[i - 1].at(-1)?.line.fahrtNr === legss[i][0].line.fahrtNr);
		}
		return actAsStopover;
	}

	let legModal = false;
	let modalLeg: LegBlock | undefined;
	function showLegModal(leg: LegBlock): void {
		modalLeg = leg;
		legModal = true;
	}
</script>

<div class="flex-row" id="journey-summary">
	{#each $displayedLocations as location, i}
		<div
			class="summary-element flex-column"
			class:station--selected={legss[i].length > 0}
			transition:scale
		>
			<div class="station-name">{location.name}</div>
			<div class="visuals-container flex-row">
				<div class="station-icon-container">
					<SummaryStationIcon
						{location}
						locationIndex={i}
						actsAsStopover={locationsActAsStopover[i]}
						isDisplayedLocation={true}
					/>
				</div>
				<div class="visuals--selected">
					<div class="intermediate-stations flex-row">
						<!--
						TODO change transition after https://github.com/sveltejs/svelte/issues/10251 is resolved
						-->
						{#each legss[i].slice(1) as leg (leg.departureData.location.requestParameter)}
							<div
								class="station-icon-container"
								in:scale
								animate:flip={{ duration: 400 }}
							>
								<SummaryStationIcon
									location={leg.departureData.location}
									locationIndex={i}
									isDisplayedLocation={false}
								></SummaryStationIcon>
							</div>
						{/each}
					</div>
					<div class="lines flex-row">
						{#each legss[i] as leg (leg.line.fahrtNr ?? Math.random())}
							<div in:scale={{}} animate:flip={{ duration: 400 }}>
								<button
									class="line-container hoverable"
									on:click={() => void showLegModal(leg)}
								>
									<span class="line--product product--{leg.line.product}"></span>
								</button>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<div class="times-container flex-row">
				<div class="times--station flex-row">
					<span class="arrival-time">
						<Time time={legss.at(i - 1)?.at(-1)?.arrivalData.time ?? {}} />
					</span>
					<i class="wait-time">30min</i>
					<span class="departure-time time">
						<Time time={legss[i].at(0)?.departureData.time ?? {}} />
					</span>
				</div>
				<div class="times--journey flex-row">
					<i class="leg-duration">0min</i>
				</div>
			</div>
		</div>
	{/each}
</div>
{#if modalLeg !== undefined}
	<Modal bind:showModal={legModal}>
		<strong slot="title">
			{modalLeg.line.name} <span class="zero-height">&rightarrow;</span>
			{modalLeg.direction}
		</strong>
		<div class="modal-content">
			<LegRegular block={modalLeg} compact={true} />
		</div>
	</Modal>
{/if}

<style>
	#journey-summary {
		position: sticky;
		top: 0;
		align-items: end;
		padding-top: 1rem;
		background-color: var(--background-color--opaque);
		backdrop-filter: var(--blur);
		-webkit-backdrop-filter: var(--blur);
	}

	.summary-element {
		width: var(--connection-width);
		margin-top: auto;
		flex-shrink: 0;
		text-align: center;
		--product-color: var(--foreground-color);
		&:first-child,
		&:last-child {
			width: calc(var(--connection-width) / 2);
		}
	}

	.station--selected,
	.station--selected + .summary-element {
		--product-color: var(--accent-color);
	}

	/* handle special cases */

	.summary-element:first-child {
		width: calc(var(--connection-width) / 2);
		& .station-name {
			text-align: left;
		}
		& .visuals-container {
			margin: 0 calc(var(--connection-width) / -2) 0 1.5em;
		}
		& .times-container {
			margin: 0 calc(var(--connection-width) / -2) 0 0;
		}
		& .times--station {
			margin-left: 0;
			width: 3em;
		}
	}

	.summary-element:nth-last-child(2) {
		& .visuals-container {
			margin: 0 calc(var(--connection-width) / -2 + 1.5em) 0 calc(var(--connection-width) / 2);
		}
	}

	.summary-element:first-child:nth-last-child(2) .visuals-container {
		margin: 0 calc(var(--connection-width) / -2 + 1.5em) 0 1.5em;
	}

	.summary-element:last-child {
		width: calc(var(--connection-width) / 2);
		& .station-name {
			text-align: right;
		}
		& .visuals-container {
			margin: 0 calc(1.5em) 0 auto;
		}
		& .times-container {
			margin: 0;
		}
		& .times--station {
			margin-left: auto;
			width: 3em;
		}
		& .times--journey {
			margin: 0;
			width: 0;
			overflow-x: clip;
		}
	}

	/* rules for name */

	.station-name {
		width: 100%;
		overflow-x: hidden;
		text-overflow: ellipsis;
	}

	/* rules for everything between name and time data */

	.visuals-container {
		height: calc(24px + 2 * var(--line-width));
		margin: 0 calc(var(--connection-width) / -2) 0 calc(var(--connection-width) / 2);
		& .visuals--selected {
			position: relative;
			width: 100%;
			height: 100%;
		}
		& .lines {
			position: absolute;
			width: 100%;
			height: 100%;
			& > * {
				width: 100%;
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
		}
		& .line-container {
			align-self: center;
			height: 100%;
			width: calc(100% + 32px);
			display: flex;
			align-items: center;
			border-radius: 50vh;
			margin: 0 -16px;
			padding: 0 12px;
			&:hover {
				position: relative;
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
	}

	.times-container i,
	.times-container span {
		margin: auto;
	}

	.times--station {
		margin-left: -3em;
		width: 6em;
		flex-shrink: 0;
		& > * {
			display: none;
		}
	}

	.times--journey {
		margin-right: 3em;
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

	.modal-content {
		padding: 0.5rem 1rem 0.5rem;
	}
</style>
