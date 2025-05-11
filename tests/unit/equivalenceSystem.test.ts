import type { LegBlock, ParsedLocation, SubJourney } from "$lib/types";
import { expect, test } from "vitest";
import { buildTransferLocationEquivalenceSystem } from "../../src/routes/de/dbnav/api/diagram/locationRepresentatives.server";
import type { LocationEquivalenceSystem } from "../../src/routes/de/dbnav/api/diagram/locationRepresentativesUtils";

const locationA1: ParsedLocation = {
	name: "a1",
	type: "station",
	position: { lng: 0, lat: 0 },
	requestParameter: "a1"
};
const locationA2: ParsedLocation = {
	name: "a2LongName",
	type: "station",
	position: { lng: 0, lat: 0 },
	requestParameter: "a2"
};
const locationB1: ParsedLocation = {
	name: "b1",
	type: "station",
	position: { lng: 0, lat: 0 },
	requestParameter: "b1"
};
const locationB2: ParsedLocation = {
	name: "b2LongName",
	type: "station",
	position: { lng: 0, lat: 0 },
	requestParameter: "b2"
};

test("location equivalence system empty", () => {
	const equivalenceSystem: LocationEquivalenceSystem = {
		representatives: {},
		idToRepresentative: {}
	};
	const subJourney = {
		blocks: [
			{ type: "leg", arrivalData: { location: locationA1 } },
			{
				type: "leg",
				departureData: { location: locationA2 },
				arrivalData: { location: locationB2 }
			},
			{ type: "leg", departureData: { location: locationB1 } }
		]
	} as SubJourney;
	const expected: LocationEquivalenceSystem = {
		representatives: { a1: locationA1, b2: locationB1 },
		idToRepresentative: { a1: "a1", a2: "a1", b2: "b2", b1: "b2" }
	};
	const actual = buildTransferLocationEquivalenceSystem(subJourney, equivalenceSystem);
	expect(actual).toEqual(expected);
});

test("location equivalence system no mapping", () => {
	const equivalenceSystem: LocationEquivalenceSystem = {
		representatives: { a2: locationA1 },
		idToRepresentative: { a1: "a2", a2: "a2" }
	};
	const subJourney = {
		blocks: [
			{ type: "leg", arrivalData: { location: locationB2 } } as LegBlock,
			{ type: "leg", departureData: { location: locationB1 } }
		]
	} as SubJourney;
	const expected: LocationEquivalenceSystem = {
		representatives: { a2: locationA1, b2: locationB1 },
		idToRepresentative: { a1: "a2", a2: "a2", b2: "b2", b1: "b2" }
	};
	const actual = buildTransferLocationEquivalenceSystem(subJourney, equivalenceSystem);
	expect(actual).toEqual(expected);
});

test("location equivalence system first location mapped", () => {
	const equivalenceSystem: LocationEquivalenceSystem = {
		representatives: { a1: locationA1 },
		idToRepresentative: { a1: "a1" }
	};
	const subJourney = {
		blocks: [
			{ type: "leg", arrivalData: { location: locationA1 } } as LegBlock,
			{ type: "leg", departureData: { location: locationA2 } }
		]
	} as SubJourney;
	const expected: LocationEquivalenceSystem = {
		representatives: { a1: locationA1 },
		idToRepresentative: { a1: "a1", a2: "a1" }
	};
	const actual = buildTransferLocationEquivalenceSystem(subJourney, equivalenceSystem);
	expect(actual).toEqual(expected);
});

test("location equivalence system second location mapped", () => {
	const equivalenceSystem: LocationEquivalenceSystem = {
		representatives: { a2: locationA2 },
		idToRepresentative: { a2: "a2" }
	};
	const subJourney = {
		blocks: [
			{ type: "leg", arrivalData: { location: locationA1 } } as LegBlock,
			{ type: "leg", departureData: { location: locationA2 } }
		]
	} as SubJourney;
	const expected: LocationEquivalenceSystem = {
		representatives: { a2: locationA1 },
		idToRepresentative: { a2: "a2", a1: "a2" }
	};
	const actual = buildTransferLocationEquivalenceSystem(subJourney, equivalenceSystem);
	expect(actual).toEqual(expected);
});

test("location equivalence system both location mapped to different representatives", () => {
	const equivalenceSystem: LocationEquivalenceSystem = {
		representatives: { a1: locationA1, a2: locationA2 },
		idToRepresentative: { a1: "a1", a2: "a2", a3: "a2" }
	};
	const subJourney = {
		blocks: [
			{ type: "leg", arrivalData: { location: locationA2 } } as LegBlock,
			{ type: "leg", departureData: { location: locationA1 } }
		]
	} as SubJourney;
	const expected: LocationEquivalenceSystem = {
		representatives: { a2: locationA1 },
		idToRepresentative: { a1: "a2", a2: "a2", a3: "a2" }
	};
	const actual = buildTransferLocationEquivalenceSystem(subJourney, equivalenceSystem);
	expect(actual).toEqual(expected);
});

test("location equivalence system both location mapped to same representative", () => {
	const equivalenceSystem: LocationEquivalenceSystem = {
		representatives: { a1: locationA1 },
		idToRepresentative: { a1: "a1", a2: "a1", a3: "a1" }
	};
	const subJourney = {
		blocks: [
			{ type: "leg", arrivalData: { location: locationA2 } } as LegBlock,
			{ type: "leg", departureData: { location: locationA1 } }
		]
	} as SubJourney;
	const expected: LocationEquivalenceSystem = {
		representatives: { a1: locationA1 },
		idToRepresentative: { a1: "a1", a2: "a1", a3: "a1" }
	};
	const actual = buildTransferLocationEquivalenceSystem(subJourney, equivalenceSystem);
	expect(actual).toEqual(expected);
});
