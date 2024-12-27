<script lang="ts">
	import { displayedFormData, selectedJourneys } from "$lib/stores/journeyStores";
	import Modal from "$lib/components/Modal.svelte";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import { type ParsedLocation } from "$lib/types";

	let locations = $derived($displayedFormData?.locations.map((l) => l.value) ?? []);
	let ticketData = $derived($selectedJourneys.map((j) => j.subJourney.ticketData));
</script>

{#snippet locationRow(location: ParsedLocation)}
	<div class="padded-top-bottom flex-row location-row">
		<div class="icon flex-column">
			<IconStationLocation iconType={location.type} color="foreground" />
		</div>
		<strong>{location.name}</strong>
	</div>
{/snippet}

<Modal title="Tickets" showModalKey="showTicketModal">
	<div class="padded-top-bottom flex-column">
		{#each ticketData as data, i}
			{@render locationRow(locations[i])}
			<div class="padded-top-bottom link-container flex-row">
				{#if data !== undefined}
					<a href={data.url} target="_blank" class="hoverable hoverable--accent">
						Tickets {data.minPrice !== undefined
							? `ab ${new Intl.NumberFormat("de-DE", {
									style: "currency",
									currency: data.currency
								}).format(data.minPrice)}`
							: ""}
					</a>
				{/if}
			</div>
		{/each}
		{@render locationRow(locations[locations.length - 1])}
	</div>
</Modal>

<style>
	.location-row {
		gap: 0.5rem;
		align-items: center;
	}
	.icon::before,
	.icon::after {
		content: "";
		width: 4px;
		height: 2.5rem;
		background-color: var(--foreground-color);
	}
	.icon::before {
		margin: -1.5rem auto -8px;
	}
	.icon::after {
		margin: -8px auto -1.5rem;
	}

	.location-row:first-child .icon::before {
		background-color: transparent;
	}

	.location-row:last-child .icon::after {
		background-color: transparent;
	}

	a {
		padding: 0.5rem 1rem;
		width: fit-content;
		margin-left: calc(1.5rem - var(--line-width));
	}
	.link-container::before {
		content: "";
		height: calc(1lh + 1rem + calc(2 * var(--line-width)));
		align-self: center;
		translate: calc(8px - var(--line-width) / 2) 0;
		width: var(--line-width);
		background-color: var(--foreground-color);
	}
</style>
