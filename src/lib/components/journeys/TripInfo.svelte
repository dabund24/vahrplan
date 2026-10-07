<script lang="ts">
	import type { LegBlock } from "$lib/types";
	import Modal from "$lib/components/Modal.svelte";
	import Warning from "$lib/components/Warning.svelte";
	import IconInfo from "$lib/components/icons/IconInfo.svelte";
	import { pushState } from "$app/navigation";
	import MiniTabs from "$lib/components/MiniTabs.svelte";
	import type { ComponentProps, Snippet } from "svelte";
	import LineNameDirection from "$lib/components/LineNameDirection.svelte";
	import { m } from "$lib/paraglide/messages";

	type Props = {
		block: LegBlock;
	};

	let { block }: Props = $props();

	const { blockKey, lineShape, product, name, productName } = $derived(block);

	function loadFactorToString(loadFactor: NonNullable<LegBlock["loadFactor"]>): string {
		return `${m.journey_occupancy()}: ${
			{
				low: m.journey_occupancy_low(),
				medium: m.journey_occupancy_medium(),
				high: m.journey_occupancy_high(),
				"very-high": m.journey_occupancy_very_high(),
			}[loadFactor]
		}`;
	}

	function operatorToString(operator: NonNullable<LegBlock["operator"]>): string {
		return `${m.journey_operator()}: ${operator}`;
	}

	function cycleToString(cycle: NonNullable<LegBlock["cycle"]>): string {
		if (cycle.min === cycle.max) {
			return m.journey_cycle_single({ n: cycle.max });
		}
		return m.journey_cycle_range({ m: cycle.min, n: cycle.max });
	}

	function tripNumberToString(tripNumber: NonNullable<LegBlock["tripNumber"]>): string {
		return `${m.journey_trip_number()}: ${tripNumber}`;
	}

	const info = $derived.by(() => {
		const info: LegBlock["info"] = {
			statuses: [...block.info.statuses],
			hints: [...block.info.hints],
		};
		if (block.loadFactor !== undefined) {
			info.hints.push(loadFactorToString(block.loadFactor));
		}
		if (block.operator !== undefined) {
			info.hints.push(operatorToString(block.operator));
		}
		if (block.cycle !== undefined) {
			info.hints.push(cycleToString(block.cycle));
		}
		if (block.tripNumber !== undefined) {
			info.hints.push(tripNumberToString(block.tripNumber));
		}
		return info;
	});

	const tabs: ComponentProps<typeof MiniTabs>["tabs"] = $derived(
		(Object.keys(info) as (keyof LegBlock["info"])[])
			.filter((key) => info[key].length > 0)
			.map(
				(key) =>
					({
						statuses: {
							title: m.journey_current_info(),
							icon: infoIconRed,
							content: statuses,
						},
						hints: {
							title: m.journey_trip_info(),
							icon: infoIconRegular,
							content: hints,
						},
					})[key],
			),
	);

	function showInfoModal(): void {
		pushState("", {
			[`showTripInfoModal${blockKey}`]: true,
		});
	}
</script>

{#snippet infoIconRed()}
	<IconInfo color="red" />
{/snippet}

{#snippet infoIconRegular()}
	<IconInfo />
{/snippet}

{#snippet statuses()}
	<ul>
		{#each info.statuses as warningText, i (i)}
			<li>
				<Warning color="red">
					{warningText}
				</Warning>
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet hints()}
	<ul class="padded-top-bottom">
		{#each info.hints as warningText, i (i)}
			<li>
				<Warning>
					{warningText}
				</Warning>
			</li>
		{/each}
	</ul>
{/snippet}

{#if info.statuses.length > 0 || info.hints.length > 0}
	<button
		title={m.journey_show_trip_info()}
		class="hoverable hoverable--visible"
		onclick={showInfoModal}
	>
		<IconInfo color={info.statuses.length > 0 ? "red" : undefined} />
	</button>
{/if}

<MiniTabs {tabEnvironment} {tabs} />

{#snippet tabEnvironment(miniTabs: Snippet, tabContent: Snippet)}
	<Modal showModalKey={`showTripInfoModal${blockKey}`} height="20rem" children={tabContent}>
		{#snippet headerItems()}
			{@render miniTabs()}
		{/snippet}

		{#snippet title()}
			<LineNameDirection lineName={name} {productName} {product} {lineShape} />
		{/snippet}
	</Modal>
{/snippet}
