<script lang="ts">
	import type { LegBlock } from "$lib/types";
	import Modal from "$lib/components/Modal.svelte";
	import Warning from "$lib/components/Warning.svelte";
	import IconInfo from "$lib/components/icons/IconInfo.svelte";
	import { pushState } from "$app/navigation";
	import MiniTabs from "$lib/components/MiniTabs.svelte";
	import type { ComponentProps, Snippet } from "svelte";
	import LineNameDirection from "$lib/components/LineNameDirection.svelte";

	type Props = {
		block: LegBlock;
	};

	let { block }: Props = $props();

	const { blockKey, lineShape, product, name, productName } = $derived(block);

	function loadFactorToString(loadFactor: NonNullable<LegBlock["loadFactor"]>): string {
		return `Auslastung: ${
			{
				low: "gering",
				medium: "mittel",
				high: "hoch",
				"very-high": "sehr hoch",
			}[loadFactor]
		}`;
	}

	function operatorToString(operator: NonNullable<LegBlock["operator"]>): string {
		return `Betreiber: ${operator}`;
	}

	function cycleToString(cycle: NonNullable<LegBlock["cycle"]>): string {
		if (cycle.min === cycle.max) {
			return `Fährt alle ${cycle.max} Minuten`;
		}
		return `Fährt alle ${cycle.min} bis ${cycle.max} Minuten`;
	}

	function tripNumberToString(tripNumber: NonNullable<LegBlock["tripNumber"]>): string {
		return `Fahrtnummer: ${tripNumber}`;
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
							title: "Aktuelle Informationen",
							icon: infoIconRed,
							content: statuses,
						},
						hints: {
							title: "Fahrthinweise",
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
		title="Fahrtinformationen anzeigen"
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
