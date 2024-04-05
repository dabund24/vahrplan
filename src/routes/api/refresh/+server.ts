import { json, type RequestHandler } from "@sveltejs/kit";
import { client } from "$lib/server/setup";
import { journeysToBlocks } from "$lib/server/parse";
import { getSuccessResponse, getZugError } from "$lib/server/responses";

export const GET: RequestHandler = async ({ url }) => {
	const tokenParam = url.searchParams.get("token")!;
	let refreshTokens: string[];
	try {
		refreshTokens = JSON.parse(atob(tokenParam)) as string[];
	} catch (e) {
		return new Response(JSON.stringify(getZugError("NOT_FOUND")));
	}
	const lang = url.searchParams.get("lang")!;
	const journeys = await Promise.all(
		refreshTokens.map(async (token) =>
			client
				.refreshJourney?.(token, {
					stopovers: true,
					language: lang,
					polylines: true
				})
				.then((journeyWRD) => journeyWRD.journey)
				.catch(() => undefined)
		)
	);
	const blocks = journeysToBlocks(journeys);
	return json(getSuccessResponse(blocks));
};
