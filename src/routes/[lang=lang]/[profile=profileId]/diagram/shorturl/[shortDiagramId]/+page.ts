import type { PageLoad } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { redirect } from "@sveltejs/kit";
import type { ServerRequestData } from "$lib/api-client/ApiClient";

export const load: PageLoad = async ({ params: { shortDiagramId }, fetch, parent }) => {
	const { profileConfig, lang } = await parent();

	const shortUrlClient = apiClient("GET", "diagram/shorturl/[shortDiagramId]");
	const diagramClient = apiClient("GET", "diagram");
	const serverRequestData: ServerRequestData = { fetchFn: fetch, lang, profileConfig };

	const { content: diagramRequestData } = (
		await shortUrlClient.request(shortDiagramId, serverRequestData)
	).throwIfError();

	const diagramUrl = diagramClient.formatNonApiUrl(diagramRequestData, { profileConfig });
	redirect(308, `${diagramUrl.pathname}?${diagramUrl.searchParams.toString()}`);
};
