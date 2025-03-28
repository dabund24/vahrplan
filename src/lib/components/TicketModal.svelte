<script lang="ts">
	import Modal from "$lib/components/Modal.svelte";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import { type ParsedLocation } from "$lib/types";
	import Warning from "$lib/components/Warning.svelte";
	import { getDisplayedFormData } from "$lib/state/displayedFormData.svelte.js";
	import { getDisplayedJourney } from "$lib/state/displayedJourney.svelte";

	const displayedFormData = $derived(getDisplayedFormData());
	let locations = $derived(displayedFormData?.locations.map((l) => l.value) ?? []);

	const ticketData = $derived(
		getDisplayedJourney().selectedSubJourneys.map((j) => j?.ticketData)
	);
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
	<Warning>
		Hinweis bei Teilstreckentickets: Wenn nur für einen Abschnitt der Reise ein Ticket benötigt
		wird, können Start- und Zielbahnhof dieser Teilstrecke als Zwischenstationen festgelegt
		werden. So lässt sich vermeiden, Tickets für Strecken zu kaufen, die bereits durch andere
		Tickets (z. B. Deutschlandticket) abgedeckt sind.
	</Warning>
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
