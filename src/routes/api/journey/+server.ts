import { json, type RequestHandler } from "@sveltejs/kit";
import { hafasClient } from "$lib/server/setup";
import { journeyToBlocks } from "$lib/server/parse/parse";
import { getSuccessResponse, getZugError } from "$lib/server/responses";
import type { JourneyBlock, UnselectedBlock, ZugResponse } from "$lib/types";

export const GET: RequestHandler = async function ({ url }) {
	const hafasTokens = getHafasTokensFromUrl(url);
	if (hafasTokens === undefined) {
		return json(getZugError("HAFAS_INVALID_REQUEST"));
	}
	return json(await getJourneyByTokens(hafasTokens));
};

/**
 * returns hafas refresh tokens for a given api url for journey endpoint
 * @param url should either have `j` param for short token (resolves at database to hafas-tokens)
 * or `tokens` param containing the tokens directly
 */
function getHafasTokensFromUrl(url: URL): (string | null)[] | undefined {
	const tokenParam = decodeURIComponent(url.searchParams.get("tokens") ?? "");
	try {
		return JSON.parse(tokenParam) as (string | null)[];
	} catch {
		return undefined;
	}
}

/**
 * get a journey by an array of hafas refresh tokens
 * @param tokens refresh tokens as defined in hafas. `null` will return an unselected block
 * @returns a journey as an array of sub-journeys where a sub-journey consists of multiple journey blocks
 */
async function getJourneyByTokens(
	tokens: (string | null)[]
): Promise<ZugResponse<JourneyBlock[][]>> {
	const journeys = await Promise.all(
		tokens.map(async (token): Promise<JourneyBlock[]> => {
			if (token === null) {
				return [{ type: "unselected" }] as UnselectedBlock[];
			}
			return (
				hafasClient
					.refreshJourney?.(token, {
						stopovers: true,
						language: "de",
						polylines: true
					})
					.then((journeyWRD) => journeyToBlocks(journeyWRD.journey))
					.catch(() => [{ type: "error" }]) ?? [{ type: "error" }]
			);
		})
	);
	return getSuccessResponse(journeys);
}
