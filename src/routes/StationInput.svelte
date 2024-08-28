<script lang="ts">
	import type { ParsedLocation } from "$lib/types";
	import { getApiData, getParsedGeolocation } from "$lib/util";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import { getApiLocationsUrl } from "$lib/urls";
	import { getBookmarks } from "$lib/bookmarks";
	import { onMount } from "svelte";
	import IconClearInput from "$lib/components/icons/IconClearInput.svelte";

	export let selectedLocation: ParsedLocation | undefined = undefined;
	export let inputPlaceholder: string;
	/**
	 * if true, behavior changes like this:
	 * - current location and bookmarks are not getting suggested
	 * - after selecting a suggestion, the input text is cleared instead of being set to the name of the selected item
	 * @default false
	 */
	export let simpleInput = false;

	let staticSuggestions: ParsedLocation[] = [];

	let inputText = (selectedLocation?.name ?? "") as string;
	let inputElement: HTMLInputElement;
	let promisedSuggestions: Promise<ParsedLocation[]> = Promise.resolve([]);
	let focused = 0;

	$: promisedSuggestions = fetchLocations(inputText);

	onMount(() => {
		if (!simpleInput) {
			staticSuggestions = [
				getParsedGeolocation(new Date(), { lat: 0, lng: 0 }),
				...getBookmarks("station")
			];
			promisedSuggestions = Promise.resolve(staticSuggestions);
		}
	});

	/**
	 * return station autocomplete suggestions for some user input
	 * @param text input from the user
	 */
	async function fetchLocations(text: string): Promise<ParsedLocation[]> {
		if (text.trim() === "") {
			return Promise.resolve(staticSuggestions);
		}
		const url = getApiLocationsUrl(text);
		return getApiData<ParsedLocation[]>(url, undefined).then((response) => {
			// start with fitting static suggestions (current location and bookmarks)
			let suggestions = staticSuggestions.filter((suggestion) =>
				suggestion.name.toLowerCase().startsWith(text.toLowerCase())
			);
			if (!response.isError) {
				// add suggestions from hafas and remove duplicates
				suggestions.push(
					...response.content.filter((suggestion) =>
						suggestions.every((s) => s.name !== suggestion.name)
					)
				);
			}
			return suggestions;
		});
	}

	function handleSuggestionClick(suggestion: ParsedLocation | undefined): void {
		if (suggestion === undefined) {
			return;
		}
		selectedLocation = suggestion;
		inputText = simpleInput ? "" : suggestion.name;
		focused = 0;
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
					handleSuggestionClick(suggestions[focused]);
					inputElement.blur();
					focused = 0;
					break;
				case "Tab":
					handleSuggestionClick(suggestions[focused]);
					focused = 0;
					break;
				default:
					focused = 0;
			}
		});
	}

	function clearInput(): void {
		inputText = "";
		inputElement.focus();
		selectedLocation = undefined;
	}
</script>

<div class="outer-wrapper">
	<div class="inner-wrapper hoverable hoverable--visible">
		<label class="flex-row input-summary padded-top-bottom">
			<span class="flex-column suggestion-icon suggestion-icon--input">
				<IconStationLocation
					color={selectedLocation === undefined ? "foreground" : "accent"}
					iconType={selectedLocation?.type ?? "station"}
				/>
			</span>
			<input
				type="text"
				placeholder={inputPlaceholder}
				bind:this={inputElement}
				bind:value={inputText}
				on:keydown={handleInputKeydown}
			/>
			{#if inputText !== ""}
				<button class="hoverable clear-input" on:click={clearInput}>
					<IconClearInput />
				</button>
			{/if}
		</label>
		<ul>
			{#await promisedSuggestions}
				{#each { length: 10 } as _}
					<li class="skeleton">
						<span class="flex-row padded-top-bottom suggestion">
							<span class="suggestion-icon">
								<IconStationLocation color={"foreground"} iconType={"station"} />
							</span>
							<span>&#8203;</span>
						</span>
					</li>
				{/each}
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
									color={"foreground"}
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
        padding: 0;
        display: block;
		background-color: transparent;
		border-color: var(--foreground-color--transparent);
	}

	ul {
		flex-direction: column;
		display: none;
	}
	.inner-wrapper:focus-within ul,
	ul:active {
		display: block;
	}
	.inner-wrapper:focus-within,
	.inner-wrapper:active {
		z-index: 50;
		border-radius: var(--border-radius--large);
		border: var(--line-width) solid var(--foreground-color--transparent);
		backdrop-filter: var(--blur);
		background-color: var(--background-color--transparent);
        /*background-image: linear-gradient(0deg, var(--foreground-color--very-transparent), var(--foreground-color--very-transparent));*/
		-webkit-backdrop-filter: var(--blur);
	}

	.input-summary {
		align-items: center;
		gap: 0.5rem;
		padding: var(--line-width) calc(0.5rem + var(--line-width));
        margin: calc(-1 * var(--line-width));
	}
	input {
		padding: 0.5rem 0;
		width: 100%;
		outline: none;
		text-overflow: ellipsis;
	}

	.clear-input {
		padding: calc(0.5rem - 4px);
		margin: 0 -0.5rem;
	}

	.suggestion {
		align-items: center;
		gap: 0.5rem;
		margin: 0 0 0 calc(var(--line-width) * -1);
		text-align: left;
		width: 100%;

		&:hover::before {
			height: var(--line-length--vertical);
		}
		&:hover .suggestion-icon {
			--foreground-color: var(--accent-color);
		}
	}
	@media screen and (pointer: fine) {
		.suggestion[aria-current="true"] .suggestion-icon {
			--foreground-color: var(--accent-color);
		}
		.suggestion[aria-current="true"]::before {
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
		transition: height 0.4s var(--cubic-bezier);
		margin: -1rem 0;
	}

	.suggestion-icon {
		display: flex;
	}

	.suggestion-icon--input::before,
	.suggestion-icon--input::after {
		content: "";
		width: 4px;
		height: calc(1lh + 1rem + 6px);
		background-color: var(--foreground-color);
		border-radius: 2px;
		transition: background-color 0.4s var(--cubic-bezier);
	}

	.suggestion-icon--input::after {
		margin: -8px auto calc(-1lh - 1rem - 6px);
	}

	.suggestion-icon--input::before {
		margin: calc(-1lh - 1rem - 6px) auto -8px;
	}

	:global(.input-container:first-child) .suggestion-icon::before,
	:global(.input-container:last-child) .suggestion-icon::after {
		background-color: transparent;
	}
	:global(.input-container--transitioning:not(:first-child):not(:last-child)),
	.input-summary:focus-within,
	.inner-wrapper:active {
		& .suggestion-icon--input::before,
		& .suggestion-icon--input::after {
			display: none;
		}
	}
</style>
