<script lang="ts">
	import type { LegBlock } from "$lib/types";
	import Modal from "$lib/components/Modal.svelte";
	import Warning from "$lib/components/Warning.svelte";
	import IconInfo from "$lib/components/icons/IconInfo.svelte";
	import { page } from "$app/stores";
	import { pushState } from "$app/navigation";
	import MiniTabs from "$lib/components/MiniTabs.svelte";
	import type { ComponentProps, Snippet } from "svelte";

	type Props = {
		info: LegBlock["info"];
		blockKey: string;
		departureTime: number;
	};

	let { info, blockKey, departureTime }: Props = $props();

	function showInfoModal(): void {
		pushState("", {
			showTripInfoModal: { [blockKey]: true }
		});
	}

	let tabs: ComponentProps<MiniTabs>["tabs"] = (Object.keys(info) as (keyof LegBlock["info"])[])
		.filter((key) => info[key].length > 0)
		.map(
			(key) =>
				({
					statuses: {
						title: "Aktuelle Informationen",
						icon: infoIconRed,
						content: statuses
					},
					hints: {
						title: "Fahrthinweise",
						icon: infoIconRegular,
						content: hints
					}
				})[key]
		);
</script>

{#snippet infoIconRed()}
	<IconInfo color={"red"} />
{/snippet}

{#snippet infoIconRegular()}
	<IconInfo />
{/snippet}

{#snippet statuses()}
	<ul>
		{#each info.statuses as warningText}
			<li>
				<Warning color={"red"}>
					{warningText}
				</Warning>
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet hints()}
	<ul>
		{#each info.hints as warningText}
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
		style:right="anchor(--leg--{blockKey} right)"
		style:position-anchor="--leg--{blockKey}{departureTime}__stopovers-summary"
	>
		<IconInfo color={info.statuses.length > 0 ? "red" : undefined} />
	</button>
{/if}

<MiniTabs {tabEnvironment} {tabs} />

{#snippet tabEnvironment(miniTabs: Snippet, tabContent: Snippet)}
	{#snippet modalHeaderItems()}
		{@render miniTabs()}
	{/snippet}
	{#if $page.state.showTripInfoModal?.[blockKey]}
		<Modal
			title="Fahrtinformationen"
			bind:showModal={$page.state.showTripInfoModal[blockKey]}
			headerItems={modalHeaderItems}
			height="20rem"
			children={tabContent}
		/>
	{/if}
{/snippet}

<style>
	ul {
		padding: 0.5rem 0;
	}
	@supports (align-self: anchor-center) {
		button {
			position: absolute;
			align-self: anchor-center;
		}
	}
</style>
