import type { JourneyBlock, ParsedLocation } from "$lib/types";

/**
 * recommend vias for a given set of sub-journey suggestions based on constraints listed in
 * [this issue](https://github.com/dabund24/vahrplan/issues/19#issue-2537334331)
 * @param subJourneys
 */
export default function recommendVias(subJourneys: JourneyBlock[][]): ParsedLocation[] {
	const viaCandidates = new ViaCandidates();
	const subJourneysLegs = subJourneys.map((subJourney) =>
		subJourney.filter((block) => block.type === "leg")
	); // filter only the leg blocks of each sub-journey. The rest is irrelevant

	for (const subJourneyLegs of subJourneysLegs) {
		// add all transfers of a sub-journey to the candidates
		for (let i = 1; i < subJourneyLegs.length; i++) {
			viaCandidates.addCandidate(
				subJourneyLegs[i - 1].arrivalData.location,
				subJourneyLegs[i].departureData.location
			);
		}
	}

	const subJourneysLocationsNames = subJourneysLegs.map((subJourneyLegs) =>
		subJourneyLegs.flatMap((leg) => [
			leg.departureData.location.name,
			...leg.stopovers.map((stopover) => stopover.location.name),
			leg.arrivalData.location.name
		])
	); // get the names of all passed locations for each sub-journey

	for (const subJourneyLocationsNames of subJourneysLocationsNames) {
		// remove the candidates that are not visited by a sub-journey
		viaCandidates.removeUnvisited(subJourneyLocationsNames);
	}

	return viaCandidates.getInOrder(subJourneysLocationsNames[0]);
}

/**
 * manages via candidates
 */
class ViaCandidates {
	/**
	 * dw
	 * @property names all found names for the candidate
	 * @property location a `ParsedLocation` object for the candidate
	 */
	candidates: {
		names: Set<string>;
		location: ParsedLocation;
	}[] = [];

	/**
	 * add a transfer as a via candidate.
	 * @param via1 arrival parsed location for the transfer
	 * @param via2 departure parsed location for the transfer
	 */
	addCandidate(via1: ParsedLocation, via2: ParsedLocation): void {
		const indexOfMatchingCandidate1 = this.candidates.findIndex((candidate) =>
			candidate.names.has(via1.name)
		);
		const indexOfMatchingCandidate2 = this.candidates.findIndex((candidate) =>
			candidate.names.has(via2.name)
		);

		if (indexOfMatchingCandidate1 === -1 && indexOfMatchingCandidate2 === -1) {
			// candidate does not yet exist
			this.candidates.push({
				names: new Set<string>([via1.name, via2.name]),
				location: via1
			});
		} else if (indexOfMatchingCandidate2 === -1) {
			// candidate already exists and is associated with via1
			this.candidates[indexOfMatchingCandidate1].names.add(via2.name);
		} else if (indexOfMatchingCandidate1 === -1) {
			// candidate already exists and is associated with via2
			this.candidates[indexOfMatchingCandidate2].names.add(via1.name);
		} else if (indexOfMatchingCandidate1 !== indexOfMatchingCandidate2) {
			// candidate already exists twice => merge them
			this.candidates[indexOfMatchingCandidate1].names.union(
				this.candidates[indexOfMatchingCandidate2].names
			); // unite names
			this.candidates.splice(indexOfMatchingCandidate2, 1); // remove other candidate
		}
		// candidate already exists once => Do nothing
	}

	/**
	 * remove all via candidates not being visited by a given sub-journey
	 * @param subJourneyLocationsNames location names of the sub-journey
	 */
	removeUnvisited(subJourneyLocationsNames: string[]): void {
		// all names of locations, visited by a sub-journey
		const subJourneyNameSet = new Set(subJourneyLocationsNames);
		this.candidates.filter((candidate) => !candidate.names.isDisjointFrom(subJourneyNameSet))
	}

	/**
	 * get all via candidates in the order of them being visited by a given sub-journey
	 *
	 * *Assumption*: All sub-journeys visit the via candidates in the same order!
	 * @param subJourneyLocationsNames location names of the sub-journey
	 * @returns the via candidates as `ParsedLocation` objects
	 */
	getInOrder(subJourneyLocationsNames: string[]): ParsedLocation[] {
		return this.candidates
			.sort((candidateA, candidateB) => {
				const indexA = subJourneyLocationsNames.findIndex((name) =>
					candidateA.names.has(name)
				);
				const indexB = subJourneyLocationsNames.findIndex((name) =>
					candidateB.names.has(name)
				);
				return indexA - indexB;
			})
			.map((candidate) => candidate.location);
	}
}
