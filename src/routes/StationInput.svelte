<script lang="ts">
	import type { ParsedLocation } from "$lib/types";
	import { getApiData } from "$lib/util";
	import IconStationLocation from "$lib/components/journeys/IconStationLocation.svelte";
	import { onMount } from "svelte";

	export let selectedLocation: ParsedLocation | undefined = undefined;

	let inputText = "";
	let inputElement: HTMLInputElement;
	let promisedSuggestions: Promise<ParsedLocation[]> = Promise.resolve([]);
	let focused = 0;
	const url = new URL("http://localhost:5173/api/locations");
	//const url = new URL("http://localhost:4173/api/locations");

	onMount(() => inputElement.setCustomValidity("Keine Station angegeben"));

	$: promisedSuggestions = fetchLocations(inputText);

	async function fetchLocations(text: string): Promise<ParsedLocation[]> {
		if (text.trim() === "") {
			return Promise.resolve([]);
		}
		url.searchParams.set("name", text);
		return getApiData<ParsedLocation[]>(url).then((response) =>
			response.isError ? [] : response.content
		);
	}

	function handleSuggestionClick(suggestion: ParsedLocation | undefined): void {
		if (suggestion === undefined) {
			return;
		}
		selectedLocation = suggestion;
		inputText = suggestion.name;
		focused = 0;
		inputElement.setCustomValidity("");
	}

	function handleInputKeydown(ev: KeyboardEvent): void {
		void promisedSuggestions.then((suggestions) => {
			switch (ev.key) {
				case "ArrowDown":
					focused = (focused + 1) % suggestions.length;
					ev.preventDefault();
					break;
				case "ArrowUp":
					focused = focused === 0 ? suggestions.length - 1 : focused - 1;
					ev.preventDefault();
					break;
				case "Enter":
				case "Tab":
					handleSuggestionClick(suggestions[focused]);
					focused = 0;
					break;
				default:
					focused = 0;
			}
		});
	}

	function handleInputBlur(): void {
		void promisedSuggestions.then(suggestions => {
			if (suggestions.length === 0 || inputText !== suggestions[0].name) {
				selectedLocation = undefined;
				inputElement.setCustomValidity("Keine Station angegeben");
			} else {
				selectedLocation = suggestions[0];
				inputElement.setCustomValidity("");
			}
		});
	}
</script>

<div class="outer-wrapper">
	<div class="inner-wrapper">
		<label class="flex-row input-summary padded-top-bottom">
			<span class="flex-row suggestion-icon">
				<IconStationLocation
					color={selectedLocation === undefined ? "foreground" : "accent"}
					iconType={selectedLocation?.type ?? "station"}
				/>
			</span>
			<input
				type="text"
				placeholder="Station"
				bind:this={inputElement}
				bind:value={inputText}
				on:keydown={handleInputKeydown}
				on:blur={handleInputBlur}
			/>
		</label>
		<ul>
			{#await promisedSuggestions}
				lol
			{:then suggestions}
				{#each suggestions as suggestion, i}
					<li>
						<button
							type="button"
							class="flex-row padded-top-bottom suggestion"
							aria-current={focused === i}
							tabindex="-1"
							on:click|preventDefault={() => void handleSuggestionClick(suggestion)}
						>
							<span class="suggestion-icon">
								<IconStationLocation
									color={focused === i ? "accent" : "foreground"}
									iconType={suggestion.type}
								/>
							</span>
							{suggestion.name}
						</button>
					</li>
				{/each}
			{:catch e}
				Fehler {e}
			{/await}
		</ul>
	</div>
</div>

<style>
	.outer-wrapper {
        width: 100%;
		height: 0;
		overflow-y: visible;
	}
	.inner-wrapper {
		position: relative;
		border-radius: var(--border-radius--large);
		border: var(--line-width) solid transparent;
    }

	ul {
		flex-direction: column;
        display: none;
	}
    .inner-wrapper:focus-within ul, ul:active {
        display: block;
    }
    .inner-wrapper:focus-within {
        z-index: 50;
        border: var(--line-width) solid var(--foreground-color--opaque);
        backdrop-filter: var(--blur);
        background-color: var(--background-color--opaque);
        -webkit-backdrop-filter: var(--blur);
    }

	.input-summary {
		align-items: center;
		gap: 0.5rem;
		padding: 0 0.5rem;
	}
	input {
		padding: 0.5rem 0;
		width: 100%;
		outline: none;
	}
	.suggestion {
		align-items: center;
		gap: 0.5rem;
		margin-left: calc(var(--line-width) * -1);
		text-align: left;

		&[aria-current="true"]::before,
		&:hover::before {
			height: var(--line-length--vertical);
		}
	}
	.suggestion::before {
		content: "";
		display: flex;
		flex-shrink: 0;
		height: 0;
		width: var(--line-width);
		border-radius: var(--border-radius--small);
		background-color: var(--accent-color);
		transition: height 0.3s;
		margin: -1rem 0;
	}

	.suggestion-icon {
        display: flex;
	}

	button {
		width: 100%;
		margin: 0;
	}
</style>
