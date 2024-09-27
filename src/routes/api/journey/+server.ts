import { json, type RequestHandler } from "@sveltejs/kit";
import { hafasClient } from "$lib/server/setup";
import { journeyToBlocks } from "$lib/server/parse/parse";
import { getSuccessResponse, getZugError, getZugErrorFromHafasError } from "$lib/server/responses";
import type { JourneyBlock, LegBlock, ZugResponse } from "$lib/types";
import type { Journey } from "hafas-client";

export const GET: RequestHandler = async function ({ url }) {
	const hafasTokens = getHafasTokensFromUrl(url);
	if (hafasTokens === undefined) {
		return json(getZugError("NOT_FOUND"), { status: 404 });
	}
	const result = await getJourneyByTokens(hafasTokens);
	return json(result, { status: result.isError ? result.code : 200 });
};

/**
 * returns hafas refresh tokens for a given api url for journey endpoint
 * @param url should either have `j` param for short token (resolves at database to hafas-tokens)
 * or `tokens` param containing the tokens directly
 */
function getHafasTokensFromUrl(url: URL): string[] | undefined {
	const tokenParam = decodeURIComponent(url.searchParams.get("tokens") ?? "");
	try {
		return JSON.parse(tokenParam) as string[];
	} catch {
		return undefined;
	}
}

/**
 * get a journey by an array of hafas refresh tokens
 * @param tokens refresh tokens as defined in hafas. `null` will return an unselected block
 * @returns a journey as an array of sub-journeys where a sub-journey consists of multiple journey blocks
 */
async function getJourneyByTokens(tokens: string[]): Promise<ZugResponse<JourneyBlock[][]>> {
	try {
		const hafasJourneys = await Promise.all(
			tokens.map(async (token): Promise<Journey> => {
				return (
					hafasClient
						.refreshJourney?.(token, {
							stopovers: true,
							language: "de",
							polylines: true
						})
						.then((journeyWRD) => journeyWRD.journey) ?? { type: "journey", legs: [] }
				);
			})
		);
		const blocks = hafasJourneys.map(journeyToBlocks);
		return getSuccessResponse(setMergingPrpoerties(blocks));
	} catch (e) {
		return getZugErrorFromHafasError(e);
	}
}

function setMergingPrpoerties(subJourneys: JourneyBlock[][]): JourneyBlock[][] {
	for (let i = 1; i < subJourneys.length; i++) {
		const arrivingSubJourneyBlock = subJourneys[i - 1].at(-1);
		const departungSubJourneyBlock = subJourneys[i].at(0);
		if (arrivingSubJourneyBlock?.type !== "leg" || departungSubJourneyBlock?.type !== "leg") {
			// do nothing
		} else if (arrivingSubJourneyBlock.blockKey === departungSubJourneyBlock.blockKey) {
			arrivingSubJourneyBlock.succeededBy = "stopover";
			departungSubJourneyBlock.precededBy = "stopover";
		} else if (legsHaveSameLocations(arrivingSubJourneyBlock, departungSubJourneyBlock)) {
			arrivingSubJourneyBlock.succeededBy = "transfer";
			departungSubJourneyBlock.precededBy = "transfer";
		}
	}
	return subJourneys;
}

function legsHaveSameLocations(arrivingLeg: LegBlock, departingLeg: LegBlock): boolean {
	return (
		arrivingLeg.arrivalData.location.position.lng ===
			departingLeg.departureData.location.position.lng &&
		arrivingLeg.arrivalData.location.position.lat ===
			departingLeg.departureData.location.position.lat
	);
}
