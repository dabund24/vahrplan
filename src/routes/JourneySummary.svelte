<script lang="ts">
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";
	import IconStationLocation from "$lib/components/journeys/IconStationLocation.svelte";
	import { displayedLocations, selectedJourneys } from "$lib/stores.js";
	import type { JourneyBlock, LegBlock } from "$lib/types.js";
	import Time from "$lib/components/journeys/Time.svelte";

	$: legss = [
		...$selectedJourneys.map((journeys) => journeys.blocks.filter<LegBlock>(isLeg)),
		[]
	];

	function isLeg(block: JourneyBlock): block is LegBlock {
		return block.type === "leg";
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
				<button class="icon-container hoverable">
					<IconStationLocation color={"product"} iconType={location.type} />
				</button>
				<div class="visuals--selected">
					<div class="intermediate-stations flex-row">
						<!--
						TODO change transition after https://github.com/sveltejs/svelte/issues/10251 is resolved
						-->
						{#each legss[i].slice(1) as leg (leg.departureData.location.requestParameter)}
							<button
								class="icon-container hoverable"
								in:scale
								out:scale
								animate:flip={{ duration: 400 }}
							>
								<IconStationLocation color={"accent"} iconType={"station"} />
							</button>
						{/each}
					</div>
					<div class="lines flex-row">
						{#each legss[i] as leg (leg.tripId)}
							<div
								class="line-container tooltip tooltip--attribute"
								in:scale={{}}
								animate:flip={{ duration: 400 }}
							>
								<div class="line--product product--{leg.line.product}"></div>
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

<style>
	#journey-summary {
		position: sticky;
		top: 0;
		align-items: end;
		padding-top: 0.5rem;
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
		}
		& .intermediate-stations {
			position: absolute;
			width: 100%;
			justify-content: space-evenly;
		}

		& .icon-container {
			display: flex;
			margin: 0 -16px;
			padding: 4px;
			border-radius: 100%;
			z-index: 1;
			position: relative;
			cursor: pointer;
		}

		& .line-container {
			align-self: center;
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
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
</style>
