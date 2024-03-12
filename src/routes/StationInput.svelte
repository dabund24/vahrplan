<script lang="ts">
	import type { ParsedLocation } from "$lib/types";
	import { getApiData } from "$lib/util";
	import IconStationLocation from "$lib/components/IconStationLocation.svelte";

	export let selectedLocation: ParsedLocation | undefined = undefined;

	let inputText = "";
	let inputElement: HTMLInputElement;
	let promisedSuggestions: Promise<ParsedLocation[]> = Promise.resolve([]);
	let focused = 0;
	const url = new URL("http://localhost:5173/api/locations");

	// onMount(() => (suggestionsTimeoutID = setTimeout(() => fetchLocations(inputText))));
	$: fetchLocations(inputText);

	async function fetchLocations(text: string) {
		if (text.trim() === "") {
			promisedSuggestions = Promise.resolve([]);
			return;
		}
		url.searchParams.set("name", text);
		promisedSuggestions = getApiData<ParsedLocation[]>(url).then((response) =>
			response.isError ? [] : response.content
		);
	}

	function handleSuggestionClick(suggestion: ParsedLocation) {
		selectedLocation = suggestion;
		inputText = suggestion.name;
		focused = 0;
		inputElement.focus();
		inputElement.blur();
	}

	async function handleInputKeydown(ev: KeyboardEvent) {
		console.log(ev.key);
		const suggestions = await promisedSuggestions;
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
				inputElement.blur();
				focused = 0
				break;
			default:
				focused = 0;
		}
	}

	async function handleInputBlur() {
		const suggestions = await promisedSuggestions;
		if (focused >= suggestions.length) {
			selectedLocation = undefined
			inputText = ""
		} else if (selectedLocation?.name !== inputText) {
			selectedLocation = suggestions[focused];
			inputText = suggestions[focused].name;
		}
	}
</script>

<div class="outer-wrapper">
	<div class="inner-wrapper">
		<label class="flex-row input-summary padded-top-bottom">
			<span class="flex-row">
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
				required
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
							on:click|preventDefault={() => handleSuggestionClick(suggestion)}
						>
							<span class="suggestionIcon"	>
								<IconStationLocation color={focused === i ? "accent" : "foreground"} iconType={suggestion.type} />
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
		height: 3rem;
		overflow-y: visible;
		width: 25rem;
		max-width: calc(100vw - 2rem);
	}
	.inner-wrapper {
		position: relative;
		border-radius: var(--border-radius--large);
		border: var(--line-width) solid var(--background-color);
	}
	.inner-wrapper:not(:focus-within) ul {
		display: none;
	}
	.inner-wrapper:focus-within {
		z-index: 50;
		border: var(--line-width) solid var(--foreground-color--opaque);
	}
	ul {
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
		height: 0;
		width: var(--line-width);
		border-radius: var(--border-radius--small);
		background-color: var(--accent-color);
		transition: height 0.3s;
	}

	button {
		width: 100%;
		margin: 0;
	}
</style>
