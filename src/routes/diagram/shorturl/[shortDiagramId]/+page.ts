import type { PageLoad } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { redirect } from "@sveltejs/kit";

export const load: PageLoad = async ({ params, fetch }) => {
	const id = params.shortDiagramId;
	const shortUrlClient = apiClient("GET", "/api/diagram/shorturl/[shortDiagramId]");
	const { content: diagramRequestData } = (
		await shortUrlClient.request(id, fetch)
	).throwIfError();
	const diagramClient = apiClient("GET", "/api/diagram");
	const diagramUrl = diagramClient.formatNonApiUrl(diagramRequestData);
	redirect(308, `${diagramUrl.pathname}?${diagramUrl.searchParams.toString()}`);
};
