<script lang="ts">
	import { displayedFormData, selectedJourneys } from "$lib/stores/journeyStores";
	import Modal from "$lib/components/Modal.svelte";

	let locationNames = $derived($displayedFormData?.locations.map((l) => l.value.name) ?? []);
	let ticketData = $derived($selectedJourneys.map((j) => j.subJourney.ticketData));
</script>

<Modal title="Tickets" showModalKey="showTicketModal">
	<div class="padded-top-bottom flex-column">
		{#each ticketData as data, i}
			<div class="padded-top-bottom">
				<strong>{locationNames[i]}</strong>
			</div>
			<div class="padded-top-bottom">
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
		<strong class="padded-top-bottom">
			{locationNames.at(-1) ?? ""}
		</strong>
	</div>
</Modal>

<style>
	a {
		padding: 0.5rem 1rem;
		width: fit-content;
	}
</style>
