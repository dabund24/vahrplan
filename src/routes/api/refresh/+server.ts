import { json, type RequestHandler } from "@sveltejs/kit";
import { client } from "$lib/server/setup";
import { journeyToBlocks } from "$lib/server/parse";
import { getSuccessResponse, getZugError } from "$lib/server/responses";
import type { JourneyBlock, UnselectedBlock } from "$lib/types";

export const GET: RequestHandler = async ({ url }) => {
	const tokenParam = url.searchParams.get("tokens")!;
	let refreshTokens: (string | undefined)[];
	try {
		refreshTokens = JSON.parse(atob(tokenParam)) as (string | undefined)[];
	} catch (e) {
		return new Response(JSON.stringify(getZugError("NOT_FOUND")));
	}
	const journeys = await Promise.all(
		refreshTokens.map(async (token): Promise<JourneyBlock[]> => {
			if (token === undefined) {
				return [{ type: "unselected" }] as UnselectedBlock[];
			}
			return (
				client
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
	return json(getSuccessResponse(journeys));
};
