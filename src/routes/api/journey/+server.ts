import { json, type RequestHandler } from "@sveltejs/kit";
import { journeyDataService } from "$lib/server/setup";
import { getZugError } from "$lib/server/responses";

export const GET: RequestHandler = async function ({ url }) {
	const hafasTokens = getHafasTokensFromUrl(url);
	if (hafasTokens === undefined) {
		return json(getZugError("NOT_FOUND"), { status: 404 });
	}
	const result = await journeyDataService.refresh(hafasTokens);
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
