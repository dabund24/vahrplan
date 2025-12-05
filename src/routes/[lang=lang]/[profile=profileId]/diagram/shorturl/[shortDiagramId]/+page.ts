import type { PageLoad } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { redirect } from "@sveltejs/kit";

export const load: PageLoad = async ({ params: { profile, lang, shortDiagramId }, fetch }) => {
	const profileClient = apiClient("GET", "profile");
	const shortUrlClient = apiClient("GET", "diagram/shorturl/[shortDiagramId]");
	const diagramClient = apiClient("GET", "diagram");

	const diagramRequestDataPromise = shortUrlClient.request(shortDiagramId, fetch);
	const { content: profileConfig } = (
		await profileClient.request({ profile, lang }, fetch)
	).throwIfError();
	const diagramRequestData = (await diagramRequestDataPromise).throwIfError().content;

	const diagramUrl = diagramClient.formatNonApiUrl(diagramRequestData, { profileConfig });
	redirect(308, `${diagramUrl.pathname}?${diagramUrl.searchParams.toString()}`);
};
