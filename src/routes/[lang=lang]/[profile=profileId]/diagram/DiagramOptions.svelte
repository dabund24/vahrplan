<script lang="ts">
	import { getDisplayedFormData } from "$lib/state/displayedFormData.svelte";
	import { type ComponentProps } from "svelte";
	import { shareDiagram } from "./share";
	import ViaRecommendations from "./ViaRecommendations.svelte";
	import IconShare from "$lib/components/icons/IconShare.svelte";
	import { getDiagramData } from "$lib/state/diagramData.svelte";
	import Options from "$lib/components/Options.svelte";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import ResponsiveOptions from "$lib/components/ResponsiveOptions.svelte";

	const displayedFormData = $derived(getDisplayedFormData());
	const diagramData = $derived(getDiagramData());

	let hasViaRecommendations = $state(false);

	const options = $derived.by((): ComponentProps<typeof Options>["options"] => {
		if (displayedFormData === undefined) {
			return [];
		}
		const opt: ComponentProps<typeof Options>["options"] = [
			{
				type: "function",
				name: "Suchanfrage teilen",
				onClick: () => shareDiagram(displayedFormData),
				icon: iconShare
			},
			{
				type: "bookmark",
				name: "Suchanfrage merken",
				icon: iconShare,
				bookmarkType: "diagram",
				bookmarkValue: async () => ({
					formData: displayedFormData,
					diagramData: await diagramData
				})
			}
		];

		if (hasViaRecommendations) {
			opt.push({
				type: "modal",
				name: "Auswahl Zwischenstationen",
				showModalKey: "showRecommendationModal",
				icon: iconStation
			});
		}

		return opt;
	});
</script>

{#await diagramData}
	<ViaRecommendations recommendedVias={[]} bind:isDisplayed={hasViaRecommendations} />
{:then { recommendedVias }}
	<ViaRecommendations {recommendedVias} bind:isDisplayed={hasViaRecommendations} />
{/await}

<ResponsiveOptions id="diagram-options" {options} isExpandedToTop={true} />

{#snippet iconStation()}
	<IconStationLocation iconType="station" color="foreground" />
{/snippet}
{#snippet iconShare()}
	<IconShare />
{/snippet}
